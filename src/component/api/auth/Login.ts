import { AxiosError, AxiosResponse } from "axios";

/**
 * ID,パスワードでログイン認証を行う
 *
 * @param loginId ログインID
 * @param password パスワード
 * @returns 認証トークン
 *
 */
export const login = async (
  loginId: string,
  password: string
): Promise<string> => {
  // create api

  // XXX: mock的処理
  // サーバーにアクセスさせず、クライアントで完結しておく
  // 不要になったらif文から削除すること
  // コメントアウトやifがないと、warningになるのが気になったため、ifを使っている
  if (true) {
    const promise: Promise<string> = new Promise<string>((resolve) => {
      // mail addressにngと入力したらダメにしておく
      if (loginId === "ng") {
        resolve("");
      } else {
        resolve("atuh token");
      }
    });

    return promise;
  }
};
