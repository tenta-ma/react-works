/**
 * 認証切れエラー
 * HttpStatus: 401
 * id password invalidでは利用しない
 */
export class TokenExpireException extends Error {
  /**  error code */
  code?: string;
  constructor(e?: string, code?: string) {
    super(e);
    this.code = code;
    this.name = new.target.name;
  }
}

/**
 * アクセス権がないエラー
 * HttpStatus: 403
 */
export class ForbiddenException extends Error {
  /**  error code */
  code?: string;
  constructor(e?: string, code?: string) {
    super(e);
    this.code = code;
    this.name = new.target.name;
  }
}

/**
 * サーバーエラー
 * HttpStatus: 500
 */
export class ServerException extends Error {
  /**  error code */
  code?: string;
  constructor(e?: string, code?: string) {
    super(e);
    this.code = code;
    this.name = new.target.name;
  }
}

/**
 * 通信タイムアウト(client)
 * clientからの通信タイムアウト
 * サーバーからのレスポンスがないためstatus codeは存在しない
 * notice. not HttpStatus: 408 とは違う
 */
export class ClientTimeoutException extends Error {
  constructor(e?: string) {
    super(e);
    this.name = new.target.name;
  }
}

/**
 * 想定していないエラー
 * HttpStatus: another one.
 */
export class UnhandleApiException extends Error {
  constructor(e?: string) {
    super(e);
    this.name = new.target.name;
  }
}
