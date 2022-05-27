import { SxProps } from "@mui/material";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Locale } from "date-fns";
import en from "date-fns/locale/en-GB";
import ja from "date-fns/locale/ja";
import ko from "date-fns/locale/ko";
import zhCN from "date-fns/locale/zh-CN";
import zhTW from "date-fns/locale/zh-TW";
import React from "react";
import { useTranslation } from "react-i18next";

/**
 * 日付のDate picker
 * Dateによる値を設定したいためstateをパラメータ管理
 *
 * @param date 表示日付
 * @param setDate 値のset state
 * @param label コンポーネントラベル
 * @param sx style css
 * @param hasError 検証エラー発生
 * @param errorMessage エラー時のメッセージ
 */
export const Date: React.FC<{
  date: Date | null;
  setDate: React.Dispatch<React.SetStateAction<Date | null>>;
  label: string;
  required: boolean;
  sx?: SxProps;
  hasError: boolean;
  errorMessage?: string;
}> = ({
  date,
  setDate,
  label,
  required,
  sx = {},
  hasError,
  errorMessage,
}): JSX.Element => {
  const { i18n } = useTranslation();
  const locale: Locale = getLocal(i18n.language);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={locale}>
      <DatePicker
        mask=""
        PaperProps={{ sx: sx }}
        label={label}
        value={date}
        onChange={setDate}
        renderInput={(params) => (
          <TextField
            required={required}
            {...params}
            error={hasError}
            helperText={errorMessage}
          />
        )}
      />
    </LocalizationProvider>
  );
};

/**
 * 言語用設定の取得
 *
 * @param language 利用言語(i18n_configに準ずる)
 * @return 言語用設定(date-fnsに準ずる)
 */
const getLocal = (language: string): Locale => {
  switch (language) {
    case "ja":
      return ja;
    case "en":
      return en;
    case "ko":
      return ko;
    case "zh-CN":
      return zhCN;
    case "zh-TW":
      return zhTW;
    default:
      const errorMessage: string = "未定義の言語が指定されている : " + language;
      throw new Error(errorMessage);
  }
};
