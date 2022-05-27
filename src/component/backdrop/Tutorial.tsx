import styled from "@emotion/styled";
import {
  FlightTakeoff as FlightTakeoffIcon,
  HomeWork as HomeWorkIcon,
  Input as InputIcon,
  KeyboardDoubleArrowDown as ArrowDownIcon,
} from "@mui/icons-material";
import { Dialog, Paper, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { DefaultButton } from "_assets/MuiStyles";

/** 枠線の太さ */
const borderWidth = {
  current: "3px",
  default: "1px",
};

/**
 * チュートリアルオーバーレイ
 *
 * @param open オーバーレイの開閉状態
 * @param setOpen open の state
 * @returns チュートリアルオーバーレイ
 */
export const Tutorial: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ open, setOpen }): JSX.Element => {
  const { t } = useTranslation("translation", { keyPrefix: "tutorial" });
  return (
    <Dialog
      fullScreen
      open={open}
      PaperProps={{
        style: {
          opacity: "0.9",
          backgroundColor: "#00489D",
          color: "#ffffff",
        },
      }}
      data-testid="tutorial-dialog">
      <Stack alignItems="center" direction="column" spacing={1} mt={1}>
        <Stack alignItems="center" direction="column" mt={2}>
          <Typography variant="h6" fontWeight="bold">
            {t("welcome")}
          </Typography>
        </Stack>
        <Typography variant="body1">{t("description")}</Typography>
        <RegisterProcess />
        <ArrowDownIcon />
        <ImmigrationProcess />
        <ArrowDownIcon />
        <StayProcess />
        <Stack direction="column" pt={3} alignItems="center">
          <Typography variant="body1">{t("haveanicetrip")}</Typography>
          <TutorialClose
            onclick={() => {
              setOpen(false);
            }}
          />
        </Stack>
      </Stack>
    </Dialog>
  );
};

/**
 * 事前登録説明Block
 *
 * @return 事前登録説明
 */
const RegisterProcess = (): JSX.Element => {
  const { t } = useTranslation("translation", {
    keyPrefix: "tutorial.process.register",
  });
  return (
    <Stack alignItems="center" spacing={1}>
      <CategoryFrame sx={{ borderWidth: borderWidth.current }}>
        <Stack
          p={1}
          direction="row"
          alignItems="center"
          justifyContent="space-between">
          <Typography variant="h6">{t("travel.index")}</Typography>
          <Typography variant="h6">{t("travel.label")}</Typography>
          <FlightTakeoffIcon />
        </Stack>
      </CategoryFrame>
      <CategoryFrame sx={{ borderWidth: borderWidth.default }}>
        <Stack
          p={1}
          direction="row"
          alignItems="center"
          justifyContent="space-between">
          <Typography variant="h6">{t("traveler.index")}</Typography>
          <Typography variant="h6">{t("traveler.label")}</Typography>
          <FlightTakeoffIcon />
        </Stack>
      </CategoryFrame>
      <Typography variant="body1">{t("attention")}</Typography>
    </Stack>
  );
};

/**
 * 日本入国説明Block
 *
 * @return 日本入国説明
 */
const ImmigrationProcess = (): JSX.Element => {
  const { t } = useTranslation("translation", {
    keyPrefix: "tutorial.process.immigration",
  });
  return (
    <Stack alignItems="center" spacing={1}>
      <CategoryFrame sx={{ borderWidth: borderWidth.default }}>
        <Stack
          p={1}
          direction="row"
          alignItems="center"
          justifyContent="space-between">
          <Typography variant="h6">{t("tojapan.index")}</Typography>
          <Typography variant="h6">{t("tojapan.label")}</Typography>
          <InputIcon />
        </Stack>
      </CategoryFrame>
      <Typography
        align={"center"}
        variant="body1"
        sx={{ whiteSpace: "pre-line" }}>
        {t("attention")}
      </Typography>
    </Stack>
  );
};

/**
 * 滞在中Block
 *
 * @return 滞在中説明
 */
const StayProcess = (): JSX.Element => {
  const { t } = useTranslation("translation", {
    keyPrefix: "tutorial.process.stay",
  });
  return (
    <Stack alignItems="center" spacing={1}>
      <CategoryFrame sx={{ borderWidth: borderWidth.default }}>
        <Stack
          p={1}
          direction="row"
          alignItems="center"
          justifyContent="space-between">
          <Typography variant="h6">{t("staying.index")}</Typography>
          <Typography variant="h6">{t("staying.label")}</Typography>
          <HomeWorkIcon />
        </Stack>
      </CategoryFrame>
      <Typography
        align={"center"}
        variant="body1"
        sx={{ whiteSpace: "pre-line" }}>
        {t("attention")}
      </Typography>
    </Stack>
  );
};

/**
 * チュートリアル閉じるボタン
 */
const TutorialClose: React.FC<{
  onclick: () => void;
}> = ({ onclick }): JSX.Element => {
  const { t } = useTranslation("translation", { keyPrefix: "tutorial.button" });

  return (
    <DefaultButton
      data-testid="tutorial-close-button"
      onClick={onclick}
      size="large"
      sx={{
        backgroundColor: "#ffffff",
        ":hover": {
          backgroundColor: "#ffffff",
        },
      }}
      variant="outlined">
      {t("next")}
    </DefaultButton>
  );
};

/**
 * 青背景用の四角枠
 */
export const CategoryFrame = styled(Paper)({
  backgroundColor: "transparent",
  color: "#ffffff",
  borderStyle: "solid",
  borderColor: "#ffffff",
  //borderWidth: "1px",
  width: "75vw",
});
