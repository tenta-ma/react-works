/**
 * 画面パス
 */
export const PagePath = {
  // home
  home: process.env.REACT_APP_CONTEXT_ROOT_PATH + "",
  // ログイン
  login: process.env.REACT_APP_CONTEXT_ROOT_PATH + "login",
  // 新規アカウント
  register: {
    // 登録
    index: process.env.REACT_APP_CONTEXT_ROOT_PATH + "register",
    // 登録完了
    complete: process.env.REACT_APP_CONTEXT_ROOT_PATH + "register/complete",
  },
  // パスワード忘れ
  forgotpassword: process.env.REACT_APP_CONTEXT_ROOT_PATH + "forgotpassword",
  // 利用規約
  terms: {
    // アカウント登録
    accountregister: process.env.REACT_APP_CONTEXT_ROOT_PATH + "terms/account",
    // 免税利用
    dutyfree: process.env.REACT_APP_CONTEXT_ROOT_PATH + "terms/tax",
  },
  // 旅行情報
  travel: {
    // 基本情報
    basic: process.env.REACT_APP_CONTEXT_ROOT_PATH + "travel/basic",
    // 入国情報
    immigration: process.env.REACT_APP_CONTEXT_ROOT_PATH + "travel/immigration",
    // 出国情報
    departure: process.env.REACT_APP_CONTEXT_ROOT_PATH + "travel/departure",
    // 滞在先情報
    placeToStay: process.env.REACT_APP_CONTEXT_ROOT_PATH + "travel/placeToStay",
  },
  // 旅行者情報
  traveler: {
    // 基本情報
    basic: process.env.REACT_APP_CONTEXT_ROOT_PATH + "traveler/basic",
    // 旅券情報
    passport: process.env.REACT_APP_CONTEXT_ROOT_PATH + "traveler/passport",
  },
  // FAQ
  faq: process.env.REACT_APP_CONTEXT_ROOT_PATH + "faq",
};
