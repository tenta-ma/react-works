import {
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material";
import { Stack } from "@mui/material";
import { Date as DateInput } from "component/form/DateTime";
import { basicInformation } from "component/storage/TravelInformation";
import {
  BarthPlace as BarthPlaceSelect,
  Family as FamilySelect,
  Purpose as PurposeSelect,
} from "pages/travel/basic/SelectBox";
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
    keyPrefix: "travel.basic",
  });
  const navigate = useNavigate();
  const { familyMembers, barthplace, stayStartDate, stayEndDate, purpose } =
    basicInformation.get();

  const familyRef: MutableRefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null!);
  const barthplaceRef: MutableRefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null!);
  const [startDate, setStartDate] = useState<Date | null>(() => {
    return stayStartDate ?? null;
  });
  const [endDate, setEndDate] = useState<Date | null>(() => {
    return stayEndDate ?? null;
  });
  const purposeRef: MutableRefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null!);

  const [submitted, setSubmitted] = useState<boolean>(false);

  // validation message
  const [errorMessage, setErrorMessage] = useState({
    family: noErrorMessage,
    barthplace: noErrorMessage,
    startDate: noErrorMessage,
    endDate: noErrorMessage,
    purpose: noErrorMessage,
  });

  // form validation と エラー時のstate 設定
  const validate = (): boolean => {
    let familyErrorMessage: string = noErrorMessage;
    const familyEmpty: boolean = !familyRef.current.value;
    if (familyEmpty) {
      familyErrorMessage = t("family.error.empty");
    }

    let barthplaceErrorMessage: string = noErrorMessage;
    const barthplaceEmpty: boolean = !barthplaceRef.current.value;
    if (barthplaceEmpty) {
      barthplaceErrorMessage = t("barthplace.error.empty");
    }

    let startDateErrorMessage: string = noErrorMessage;
    const startDateEmpty: boolean = !startDate;
    // Dateの比較で開始日<=終了日であること
    const dateCompared: boolean =
      !!startDate && !!endDate && dateCompareTo(startDate, endDate) >= 0;
    if (startDateEmpty) {
      startDateErrorMessage = t("stayStartDate.error.empty");
    } else if (!dateCompared) {
      startDateErrorMessage = t("stayStartDate.error.compare");
    }

    let endDateErrorMessage: string = noErrorMessage;
    const endDateEmpty: boolean = !endDate;
    if (endDateEmpty) {
      endDateErrorMessage = t("stayEndDate.error.empty");
    }

    let purposeErrorMessage: string = noErrorMessage;
    const purposeEmpty: boolean = !purposeRef.current.value;
    if (purposeEmpty) {
      purposeErrorMessage = t("purpose.error.empty");
    }

    setErrorMessage({
      family: familyErrorMessage,
      barthplace: barthplaceErrorMessage,
      startDate: startDateErrorMessage,
      endDate: endDateErrorMessage,
      purpose: purposeErrorMessage,
    });

    return (
      !familyEmpty &&
      !barthplaceEmpty &&
      !startDateEmpty &&
      dateCompared &&
      !endDateEmpty &&
      !purposeEmpty
    );
  };

  // 次へボタン押下時の処理
  const next = (): void => {
    setSubmitted(true);

    const valid: boolean = validate();

    if (valid) {
      // 入力OKなら画面遷移OK&値保持
      basicInformation.set({
        familyMembers: familyRef.current.value,
        barthplace: barthplaceRef.current.value,
        stayStartDate: startDate ?? undefined,
        stayEndDate: endDate ?? undefined,
        purpose: purposeRef.current.value,
      });
      navigate(PagePath.travel.immigration);
    }
  };

  return (
    <React.Fragment>
      <Stack direction="column" spacing={1} p={1} flexGrow={1}>
        <FamilySelect
          value={familyMembers}
          inputRef={familyRef}
          hasError={submitted && !!errorMessage.family.trim()}
          errorMessage={errorMessage.family}
        />
        <BarthPlaceSelect
          value={barthplace}
          inputRef={barthplaceRef}
          hasError={submitted && !!errorMessage.barthplace.trim()}
          errorMessage={errorMessage.barthplace}
        />
        <Stack direction="row" spacing={2}>
          <StayStartDate
            date={startDate}
            setDate={setStartDate}
            hasError={submitted && !!errorMessage.startDate.trim()}
            errorMessage={errorMessage.startDate}
          />
          <Stack alignItems={"center"} justifyContent={"center"}>
            ～
          </Stack>
          <StayEndDate
            date={endDate}
            setDate={setEndDate}
            hasError={submitted && !!errorMessage.endDate.trim()}
            errorMessage={errorMessage.endDate}
          />
        </Stack>
        <PurposeSelect
          value={purpose}
          inputRef={purposeRef}
          hasError={submitted && !!errorMessage.purpose.trim()}
          errorMessage={errorMessage.purpose}
        />
      </Stack>
      <ButtonArea>
        <Back />
        <Next click={next} />
      </ButtonArea>
    </React.Fragment>
  );
};

/**
 * 滞在開始日
 *
 * @param date 表示日付
 * @param setDate 値のset state
 * @param hasError エラーが発生したか
 * @param errorMessage エラー発生時のメッセージ
 * @return 滞在開始日
 */
const StayStartDate: React.FC<{
  date: Date | null;
  setDate: React.Dispatch<React.SetStateAction<Date | null>>;
  hasError: boolean;
  errorMessage?: string;
}> = ({ date, setDate, hasError, errorMessage }): JSX.Element => {
  const { t } = useTranslation("translation", {
    keyPrefix: "travel.basic.stayStartDate",
  });
  const label: string = t("label");

  return (
    <DateInput
      hasError={hasError}
      errorMessage={errorMessage}
      date={date}
      setDate={setDate}
      label={label}
      sx={{}}
      required={true}
    />
  );
};

/**
 * 滞在終了日
 *
 * @param date 表示日付
 * @param setDate 値のset state
 * @param hasError エラーが発生したか
 * @param errorMessage エラー発生時のメッセージ
 * @return 滞在終了日
 */
const StayEndDate: React.FC<{
  date: Date | null;
  setDate: React.Dispatch<React.SetStateAction<Date | null>>;
  hasError: boolean;
  errorMessage?: string;
}> = ({ date, setDate, hasError, errorMessage }): JSX.Element => {
  const { t } = useTranslation("translation", {
    keyPrefix: "travel.basic.stayEndDate",
  });
  const label: string = t("label");

  return (
    <DateInput
      hasError={hasError}
      errorMessage={errorMessage}
      date={date}
      setDate={setDate}
      label={label}
      sx={{}}
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
    keyPrefix: "travel.basic.button",
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
const Back = (): JSX.Element => {
  // FIXME: 基本情報画面での戻るの制御が不明
  const { t } = useTranslation("translation", {
    keyPrefix: "travel.basic.button",
  });
  return (
    <DefaultButton
      data-testid="terms-account-agree-button"
      onClick={() => {}}
      size="large"
      variant="outlined"
      disabled
      startIcon={<ArrowBackIcon />}
      sx={{ width: "10rem" }}>
      {t("back")}
    </DefaultButton>
  );
};

/**
 * Dateの日付のみの比較(時分秒は切り落として比較)
 * start <= end である場合、trueを返す、start > end の場合false
 * null safeであり、片方でもnull or undefinedの場合、falseを返す
 *
 * @param start 開始
 * @param end 終了
 * @return 比較結果(compareTo)
 */
const dateCompareTo = (start: Date, end: Date): number => {
  const startDate: number = new Date(start).setHours(0, 0, 0, 0);
  const endDate: number = new Date(end).setHours(0, 0, 0, 0);

  if (startDate < endDate) {
    return 1;
  } else if (startDate === endDate) {
    return 0;
  } else {
    return -1;
  }
};
