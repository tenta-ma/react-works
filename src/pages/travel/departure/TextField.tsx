import { TextField } from "@mui/material";
import React, { RefObject } from "react";
import { useTranslation } from "react-i18next";

/**
 * 便名
 *
 * @param value 初期設定値
 * @param inputRef RefObject
 * @param hasError 検証エラー発生
 * @param errorMessage エラー時のメッセージ
 * @returns 便名テキストフィールド
 */
export const AircraftName: React.FC<{
  value?: string;
  inputRef: RefObject<HTMLInputElement>;
  hasError: boolean;
  errorMessage: string;
}> = ({ value, inputRef, hasError, errorMessage }): JSX.Element => {
  const { t } = useTranslation("translation", {
    keyPrefix: "travel.departure.aircraftName",
  });
  const labelId: string = "input-aircraftName-label";
  const labelText: string = t("label");
  // helperText作成
  var helperText: JSX.Element = (
    <React.Fragment>
      {t("helper.description")}
      <br />
      {t("helper.regex")}
      <br />
      {errorMessage}
    </React.Fragment>
  );
  return (
    <TextField
      helperText={helperText}
      error={hasError}
      id={labelId}
      inputRef={inputRef}
      label={labelText}
      defaultValue={value}
      data-testid="departure-aircraftName"
      required
      inputProps={{ "data-testid": "input-aircraftName" }}
    />
  );
};

/**
 * 航空機会社名
 *
 * @param value 初期設定値
 * @param inputRef RefObject
 * @param hasError 検証エラー発生
 * @param errorMessage エラー時のメッセージ
 * @returns 航空機会社名テキストフィールド
 */
export const AircraftCompany: React.FC<{
  value?: string;
  inputRef: RefObject<HTMLInputElement>;
  hasError: boolean;
  errorMessage: string;
}> = ({ value, inputRef, hasError, errorMessage }): JSX.Element => {
  const { t } = useTranslation("translation", {
    keyPrefix: "travel.departure.aircraftCompany",
  });
  const labelId: string = "input-aircraftCompany-label";
  const labelText: string = t("label");
  return (
    <TextField
      style={{ marginTop: "15px" }}
      helperText={errorMessage}
      error={hasError}
      id={labelId}
      inputRef={inputRef}
      label={labelText}
      defaultValue={value}
      data-testid="departure-aircraftCompany"
      required
      inputProps={{ "data-testid": "input-aircraftCompany" }}
    />
  );
};

/**
 * 座席番号
 *
 * @param value 初期設定値
 * @param inputRef RefObject
 * @param hasError 検証エラー発生
 * @param errorMessage エラー時のメッセージ
 * @returns 座席番号テキストフィールド
 */
export const SeatNumber: React.FC<{
  value?: string;
  inputRef: RefObject<HTMLInputElement>;
  hasError: boolean;
  errorMessage: string;
}> = ({ value, inputRef, hasError, errorMessage }): JSX.Element => {
  const { t } = useTranslation("translation", {
    keyPrefix: "travel.departure.seatNumber",
  });
  const labelId: string = "input-seatNumber-label";
  const labelText: string = t("label");
  return (
    <TextField
      helperText={errorMessage}
      error={hasError}
      id={labelId}
      inputRef={inputRef}
      label={labelText}
      defaultValue={value}
      data-testid="departure-seatNumber"
      required
      inputProps={{ "data-testid": "input-seatNumber" }}
    />
  );
};
