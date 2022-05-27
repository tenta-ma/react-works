import { AxiosError } from "axios";
import {
  ClientTimeoutException,
  ForbiddenException,
  ServerException,
  TokenExpireException,
  UnhandleApiException,
} from "component/api/error/ApiException";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "_generated/api/api";

/**
 * APIエラーから定義されたExceptionを返却する
 *
 * @param error APIエラー
 */
export const createApiError = (error: AxiosError<ApiError>): Error => {
  if (!error.isAxiosError) {
    // 通信ではないエラー
    // XXX: Axios.isAxiosErrorのほうがよい？
    console.error("unhandle error : " + error);
    return new UnhandleApiException(error.message);
  }

  if (error.code === AxiosError.ERR_NETWORK) {
    // クライアント検知での通信タイムアウト
    return new ClientTimeoutException(error.message);
  }

  if (!error.response) {
    // 想定外の不正なエラー
    return new UnhandleApiException(error.message);
  }

  const apiResponse: ApiError = error.response?.data;
  switch (error.response?.status) {
    case StatusCodes.UNAUTHORIZED:
      return new TokenExpireException(apiResponse.message, apiResponse.code);
    case StatusCodes.FORBIDDEN:
      return new ForbiddenException(apiResponse.message, apiResponse.code);
    case StatusCodes.INTERNAL_SERVER_ERROR:
      return new ServerException(apiResponse.message, apiResponse.code);
    default:
      return new UnhandleApiException(error.message);
  }
};
