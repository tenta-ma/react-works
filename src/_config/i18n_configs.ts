import i18n, { Resource } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import common from "_assets/locales/common.json";
import translationEn from "_assets/locales/en.json";
import translationJa from "_assets/locales/ja.json";
import translationKo from "_assets/locales/ko.json";
import translationZhCn from "_assets/locales/zh-CN.json";
import translationZhTw from "_assets/locales/zh-TW.json";

// 言語取得をプロジェクトに包括したi18n

/**
 * 言語Pack
 *
 * hint. 都道府県とか市区町村とかそういう多言語化しにくい（不要なもの）
 * とかは切り出したほうが管理しやすい。かも
 *
 * common: 翻訳が不要な(e.g. ロゴとか)言葉。同じファイルを参照させる
 * translation: 翻訳が必要な言葉
 */
const resources: Resource = {
  ja: {
    common: common,
    translation: translationJa,
  },
  en: {
    common: common,
    translation: translationEn,
  },
  ko: {
    common: common,
    translation: translationKo,
  },
  "zh-CN": {
    common: common,
    translation: translationZhCn,
  },
  "zh-TW": {
    common: common,
    translation: translationZhTw,
  },
};

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: {
      // 言語設定優先設定
      order: ["localStorage", "navigator"],
      // キャッシュ設定
      // localStorageに言語設定が保存される
      caches: ["localStorage"],
    },
    // 言語pack
    resources,
    // 設定可能な言語がない場合の初期設定言語
    fallbackLng: "en",
    // サポート言語
    // これを設定しないと"ja-JP"とかが来た場合に対応できないようである
    // android chromeのdefaultでこうなっているケースがある
    supportedLngs: ["en", "ja", "ko", "zh-CN", "zh-TW"],
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
