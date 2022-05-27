// FIXME: この実装ファイルは最終的に削除されていること
// FIXME: 認証方法が決まってないため、適当に実装
// 仕様的にsession storageじゃなくて local storageだけど、動確(いちいち消すの)めんどいからsession storageで実装

// storageに格納するkey
const tokenKey: string = "token";

/**
 * session strageから認証トークンを取得する
 * 設定されていない場合は空文字を返却
 *
 * @returns 認証トークン
 *
 */
export const getToken = (): string => {
  return sessionStorage.getItem(tokenKey) ?? "";
};

/**
 * 認証トークンをsession strageに保存する
 *
 * @param token 認証情報
 *
 */
export const saveToken = (token: string): void => {
  sessionStorage.setItem(tokenKey, token);
};

/**
 * 認証中かどうか
 * 認証トークンが有効である場合、認証中とする
 */
export const isAuthenticated = (): boolean => {
  // XXX: トークンもmock的なものを返すので期限の検証もやってない
  return !!sessionStorage.getItem(tokenKey);
};
