import { Select, SelectChangeEvent, SxProps } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

/**
 * 言語選択セレクトボックス<br>
 * 言語選択を行うと言語の変更を行う
 *
 * @param sxProp style要素
 * @returns 開閉メニュー
 */
export const LanguageSelect: React.FC<{
  sxProp: SxProps;
}> = ({ sxProp }): JSX.Element => {
  const { i18n } = useTranslation("translation");

  // 選択した言語セットに変更
  const changeLanguage = (e: SelectChangeEvent<string>): void => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <Select
      data-testid="choiceLanguage"
      sx={sxProp}
      native
      labelId="language-select-label"
      id="language-select"
      value={i18n.language}
      onChange={changeLanguage}
      inputProps={{ "data-testid": "selectOptions" }}>
      {languageOptions.map((lngOption) => (
        <option key={lngOption.key} value={lngOption.value}>
          {lngOption.label}
        </option>
      ))}
    </Select>
  );
};

/**
 * 言語選択のセレクトボックス
 */
export const languageOptions: SelectOption[] = [
  { key: "ja", value: "ja", label: "日本語" },
  { key: "en", value: "en", label: "English" },
  { key: "ko", value: "ko", label: "한국어" },
  { key: "zh-CN", value: "zh-CN", label: "简体中文" },
  { key: "zh-TW", value: "zh-TW", label: "繁體中文" },
];

/**
 * select option
 */
type SelectOption = {
  key: string;
  value: string;
  label: string;
};
