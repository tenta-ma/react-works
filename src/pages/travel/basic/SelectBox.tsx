import { FormControl, FormHelperText, InputLabel, Select } from "@mui/material";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import jaLocale from "i18n-iso-countries/langs/ja.json";
import koLocale from "i18n-iso-countries/langs/ko.json";
import zhLocale from "i18n-iso-countries/langs/zh.json";
import React, { RefObject } from "react";
import { useTranslation } from "react-i18next";

/**
 * 同伴家族人数
 *
 * @param value 初期設定値
 * @param inputRef RefObject
 * @param hasError 検証エラー発生
 * @param errorMessage エラー時のメッセージ
 * @returns 同伴家族人数セレクトボックス
 */
export const Family: React.FC<{
  value?: string;
  inputRef: RefObject<HTMLInputElement>;
  hasError: boolean;
  errorMessage: string;
}> = ({ value, inputRef, hasError, errorMessage }): JSX.Element => {
  const familyOptions: string[] = ["0", "1", "2", "3", "4", "5"];

  const { t } = useTranslation("translation", {
    keyPrefix: "travel.basic.family",
  });
  const labelId: string = "family-select-label";
  const labelText: string = t("label");
  return (
    <FormControl fullWidth error={hasError}>
      <InputLabel id={labelId}>{labelText} *</InputLabel>
      <Select
        required
        native
        labelId={labelId}
        label={labelText}
        inputRef={inputRef}
        defaultValue={value}
        data-testid="basic-family-select"
        id="family-select"
        inputProps={{ "data-testid": "family-select-options" }}>
        <option value={""} />
        {familyOptions.map((opt: string, index: number) => (
          <option key={index} value={opt}>
            {opt}
          </option>
        ))}
      </Select>
      <FormHelperText>{errorMessage}</FormHelperText>
    </FormControl>
  );
};

/**
 * 出身地
 *
 * @param value 初期設定値
 * @param inputRef RefObject
 * @param hasError 検証エラー発生
 * @param errorMessage エラー時のメッセージ
 * @returns 出身地セレクトボックス
 */
export const BarthPlace: React.FC<{
  value?: string;
  inputRef: RefObject<HTMLInputElement>;
  hasError: boolean;
  errorMessage?: string;
}> = ({ value, inputRef, hasError, errorMessage = "" }): JSX.Element => {
  const { t, i18n } = useTranslation("translation", {
    keyPrefix: "travel.basic.barthplace",
  });
  // 各言語用設定
  countries.registerLocale(enLocale);
  countries.registerLocale(jaLocale);
  countries.registerLocale(koLocale);
  countries.registerLocale(zhLocale);

  // 繁体中国・簡体中国語はzhに補正
  const lng: string =
    i18n.language === "zh-CN" || i18n.language === "zh-TW"
      ? "zh"
      : i18n.language;
  // XXX: officialってなんやねん？
  const countryObj = countries.getNames(lng, { select: "official" });
  // セレクトボックスのopt
  const countryArr: { label: string; value: string }[] = Object.entries(
    countryObj
  ).map(([key, value]) => {
    return {
      label: value,
      value: key,
    };
  });

  const labelId: string = "barthplace-select-label";
  const labelText: string = t("label");
  return (
    <FormControl fullWidth error={hasError}>
      <InputLabel id={labelId}>{labelText} *</InputLabel>
      <Select
        required
        // notice. 件数が多いのでnativeにしないとヤヴァイ
        native
        labelId={labelId}
        label={labelText}
        inputRef={inputRef}
        defaultValue={value}
        data-testid="basic-family-select"
        id="family-select"
        inputProps={{ "data-testid": "family-select-options" }}>
        <option value={""} />
        {!!countryArr?.length &&
          countryArr.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
      </Select>
      <FormHelperText>{errorMessage}</FormHelperText>
    </FormControl>
  );
};

/**
 * 渡航目的
 *
 * @param value 初期設定値
 * @param inputRef RefObject
 * @param hasError 検証エラー発生
 * @param errorMessage エラー時のメッセージ
 * @returns 渡航目的セレクトボックス
 */
export const Purpose: React.FC<{
  value?: string;
  inputRef: RefObject<HTMLInputElement>;
  hasError: boolean;
  errorMessage: string;
}> = ({ value, inputRef, hasError, errorMessage }): JSX.Element => {
  const { t } = useTranslation("translation", {
    keyPrefix: "travel.basic.purpose",
  });
  const options: { val: string; label: string }[] = t("options", {
    returnObjects: true,
  }) as {
    val: string;
    label: string;
  }[];

  const labelId: string = "purpose-select-label";
  const labelText: string = t("label");
  return (
    <FormControl fullWidth error={hasError}>
      <InputLabel id={labelId}>{labelText} *</InputLabel>
      <Select
        labelId={labelId}
        required
        native
        label={labelText}
        inputRef={inputRef}
        defaultValue={value}
        data-testid="basic-family-select"
        id="family-select"
        inputProps={{ "data-testid": "family-select-options" }}>
        <option value={""} />
        {options.map((option, index) => (
          <option key={index} value={option.val}>
            {option.label}
          </option>
        ))}
      </Select>
      <FormHelperText>{errorMessage}</FormHelperText>
    </FormControl>
  );
};
