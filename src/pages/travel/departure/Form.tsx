import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Stack } from "@mui/material";
import { Date as DateInput } from "component/form/DateTime";
import { departureInformation } from "component/storage/TravelInformation";
import {
  AircraftCompany,
  AircraftName,
  SeatNumber,
} from "pages/travel/departure/TextField";
import React, { MutableRefObject, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ButtonArea, DefaultButton } from "_assets/MuiStyles";
import { PagePath } from "_const/PagePath";

/**
 * エラーなし時のメッセージ
 * mui helperTextの都合上、空文字の場合無し扱いになるため
 * 初期時に空行を設定するために用意
 */
const noErrorMessage: string = " ";

/**
 * 入力フォーム
 */
export const Form = () => {
  const { t } = useTranslation("translation", {
    keyPrefix: "travel.departure",
  });
  const navigate = useNavigate();
  const { departureDate, aircraftName, aircraftCompany, seatNumber } =
    departureInformation.get();

  const [dateOfEntry, setDateOfEntry] = useState<Date | null>(() => {
    return departureDate ?? null;
  });
  const aircraftNameRef: MutableRefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null!);
  const aircraftCompanyRef: MutableRefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null!);
  const seatNumberRef: MutableRefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null!);

  const [submitted, setSubmitted] = useState<boolean>(false);

  // validation massage
  const [errorMessage, setErrorMessage] = useState({
    departureDate: noErrorMessage,
    aircraftName: noErrorMessage,
    aircraftCompany: noErrorMessage,
    seatNumber: noErrorMessage,
  });

  // form validation と エラー時のstate 設定
  const validate = (): boolean => {
    // departureDate エラー時のstate 設定
    let departureDateErrorMessage: string = noErrorMessage;
    const departureDateEmpty: boolean = !dateOfEntry;
    if (departureDateEmpty) {
      departureDateErrorMessage = t("departureDate.error.empty");
    }

    const aircraftName: string = aircraftNameRef.current.value;
    const aircraftNameEmpty: boolean = !aircraftName;
    // aircraftNameが半角英字数字記号のみであること
    const asciiOnly: boolean = isAscii(aircraftName);
    // aircraftName エラー時のstate 設定
    let aircraftNameErrorMessage: string = noErrorMessage;
    if (aircraftNameEmpty) {
      aircraftNameErrorMessage = t("aircraftName.error.empty");
    } else if (!asciiOnly) {
      aircraftNameErrorMessage = t("aircraftName.error.pattern");
    }

    // aircraftCompany エラー時のstate 設定
    let aircraftCompanyErrorMessage: string = noErrorMessage;
    const aircraftCompanyEmpty: boolean = !aircraftCompanyRef.current.value;
    if (aircraftCompanyEmpty) {
      aircraftCompanyErrorMessage = t("aircraftCompany.error.empty");
    }

    // seatNumber エラー時のstate 設定
    let seatNumberErrorMessage: string = noErrorMessage;
    const seatNumberEmpty: boolean = !seatNumberRef.current.value;
    if (seatNumberEmpty) {
      seatNumberErrorMessage = t("seatNumber.error.empty");
    }

    setErrorMessage({
      departureDate: departureDateErrorMessage,
      aircraftName: aircraftNameErrorMessage,
      aircraftCompany: aircraftCompanyErrorMessage,
      seatNumber: seatNumberErrorMessage,
    });

    return (
      !departureDateEmpty &&
      !aircraftNameEmpty &&
      asciiOnly &&
      !aircraftCompanyEmpty &&
      !seatNumberEmpty
    );
  };

  // 次へボタン押下時の処理
  const next = (): void => {
    setSubmitted(true);

    const valid: boolean = validate();

    if (valid) {
      // 入力OKなら画面遷移OK&値保持
      departureInformation.set({
        departureDate: dateOfEntry ?? undefined,
        aircraftName: aircraftNameRef.current.value.toUpperCase() ?? undefined,
        aircraftCompany: aircraftCompanyRef.current.value ?? undefined,
        seatNumber: seatNumberRef.current.value ?? undefined,
      });
      navigate(PagePath.travel.placeToStay);
    }
  };

  // 戻るボタン押下時の処理
  const back = (): void => {
    setSubmitted(true);

    const valid: boolean = validate();

    if (valid) {
      // 全て入力OKなら値保持
      departureInformation.set({
        departureDate: dateOfEntry ?? undefined,
        aircraftName: aircraftNameRef.current.value.toUpperCase() ?? undefined,
        aircraftCompany: aircraftCompanyRef.current.value ?? undefined,
        seatNumber: seatNumberRef.current.value ?? undefined,
      });
    }

    // 画面遷移(入国情報登録画面へ)
    navigate(PagePath.travel.immigration);
  };

  return (
    <Stack direction="column" spacing={1} p={1}>
      <EntryDate
        date={dateOfEntry}
        setDate={setDateOfEntry}
        hasError={submitted && !!errorMessage.departureDate.trim()}
        errorMessage={errorMessage.departureDate}
      />
      <AircraftName
        value={aircraftName}
        inputRef={aircraftNameRef}
        hasError={submitted && !!errorMessage.aircraftName.trim()}
        errorMessage={errorMessage.aircraftName}
      />
      <AircraftCompany
        value={aircraftCompany}
        inputRef={aircraftCompanyRef}
        hasError={submitted && !!errorMessage.aircraftCompany.trim()}
        errorMessage={errorMessage.aircraftCompany}
      />
      <SeatNumber
        value={seatNumber}
        inputRef={seatNumberRef}
        hasError={submitted && !!errorMessage.seatNumber.trim()}
        errorMessage={errorMessage.seatNumber}
      />
      <ButtonArea>
        <Back click={back} />
        <Next click={next} />
      </ButtonArea>
    </Stack>
  );
};

/**
 * 出国予定日
 *
 * @param date 表示日付
 * @param setDate 値のset state
 * @param hasError エラーが発生したか
 * @param errorMessage エラー発生時のメッセージ
 * @return 出国予定日
 */
const EntryDate: React.FC<{
  date: Date | null;
  setDate: React.Dispatch<React.SetStateAction<Date | null>>;
  hasError: boolean;
  errorMessage?: string;
}> = ({ date, setDate, hasError, errorMessage }): JSX.Element => {
  const { t } = useTranslation("translation", {
    keyPrefix: "travel.departure.departureDate",
  });
  const label: string = t("label");

  return (
    <DateInput
      hasError={hasError}
      errorMessage={errorMessage}
      date={date}
      setDate={setDate}
      label={label}
      required={true}
    />
  );
};

/**
 * 次へボタン
 *
 * @param click ボタン押下時の処理
 * @return 「次へ」ボタン
 */
const Next: React.FC<{
  click: () => void;
}> = ({ click }): JSX.Element => {
  const { t } = useTranslation("translation", {
    keyPrefix: "travel.departure.button",
  });
  return (
    <DefaultButton
      data-testid="terms-account-agree-button"
      onClick={click}
      size="large"
      variant="contained"
      startIcon={<ArrowForwardIcon />}
      sx={{ width: "10rem" }}>
      {t("next")}
    </DefaultButton>
  );
};

/**
 * 戻るボタン
 * @return 「戻る」ボタン
 */
const Back: React.FC<{
  click: () => void;
}> = ({ click }): JSX.Element => {
  const { t } = useTranslation("translation", {
    keyPrefix: "travel.departure.button",
  });
  return (
    <DefaultButton
      data-testid="back-button"
      onClick={click}
      size="large"
      variant="outlined"
      startIcon={<ArrowBackIcon />}
      sx={{ width: "10rem" }}>
      {t("back")}
    </DefaultButton>
  );
};

// 半角英字数字記号のみチェックメソッド
const isAscii = (str: string): boolean => {
  // 比較対象[半角英字数字記号]
  const ascii: RegExp = new RegExp(
    /^[0-9a-zA-Z!"#$%&'()「*+\-.,/:;<=>?@[\\\]^_`{|}~ ]*$/
  );
  return str.match(ascii) ? true : false;
};
