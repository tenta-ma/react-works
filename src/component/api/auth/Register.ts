/**
 * 新規登録
 *
 * @param loginId ログインID
 * @param password パスワード
 * @returns 認証トークン
 *
 */
export const register = async (mailAddress: string): Promise<void> => {
  // XXX: mock的処理
  // サーバーにアクセスさせず、クライアントで完結しておく
  // 不要になったらif文から削除すること
  // コメントアウトやifがないと、warningになるのが気になったため、ifを使っている
  if (true) {
    return;
  }
};
