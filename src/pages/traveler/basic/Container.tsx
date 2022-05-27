import {
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material";
import { Card, CardMedia, Stack, Typography } from "@mui/material";
import { PassportCapture } from "component/backdrop/PassportCapture";
import { ErrorFallback } from "component/error/ErrorFallback";
import { Footer } from "component/footer/Footer";
import { Header } from "component/header/Header";
import { TravelerHeader } from "pages/traveler/TravelerHeader";
import { MutableRefObject, useRef, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ButtonArea, CircledText, DefaultButton } from "_assets/MuiStyles";
import { PagePath } from "_const/PagePath";

/**
 * 旅行者情報/基本情報
 *
 * @returns 旅行者情報/基本情報画面
 */
export const Container = (): JSX.Element => {
  const { t } = useTranslation("translation", { keyPrefix: "traveler.basic" });

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Stack minHeight={"100vh"}>
        <Header />
        <TravelerHeader activeIndex={0} />
        <Stack direction="column" spacing={2} flexGrow={1}>
          <TitleBar />
        </Stack>

        <ButtonArea>
          <Back />
          <Next />
        </ButtonArea>
        <Footer />
      </Stack>
    </ErrorBoundary>
  );
};

/**
 * 小タイトル
 *
 * @returns 小タイトル
 */
const TitleBar = (): JSX.Element => {
  const { t } = useTranslation("translation", { keyPrefix: "traveler.basic" });

  return (
    <Stack
      direction="row"
      spacing={1}
      p={1}
      sx={{ backgroundColor: "#D6F3FF" }}>
      <CircledText>1</CircledText>
      <Typography variant="body1" data-testid="title">
        {t("title")}
      </Typography>
    </Stack>
  );
};

/**
 * 次へボタン
 *
 * @return 「次へ」ボタン
 */
const Next: React.FC<{}> = ({}): JSX.Element => {
  const { t } = useTranslation("translation", {
    keyPrefix: "traveler.basic.button",
  });
  const navigate = useNavigate();
  const toPassport = (): void => {
    navigate(PagePath.traveler.passport);
  };
  return (
    <DefaultButton
      data-testid="terms-account-agree-button"
      size="large"
      onClick={toPassport}
      variant="contained"
      startIcon={<ArrowForwardIcon />}
      sx={{ width: "10rem" }}>
      {t("next")}
    </DefaultButton>
  );
};

/**
 * 戻るボタン
 *
 * @return 「戻る」ボタン
 */
const Back = (): JSX.Element => {
  const { t } = useTranslation("translation", {
    keyPrefix: "traveler.basic.button",
  });

  return (
    <DefaultButton
      data-testid="terms-account-agree-button"
      disabled
      size="large"
      variant="outlined"
      startIcon={<ArrowBackIcon />}
      sx={{ width: "10rem" }}>
      {t("back")}
    </DefaultButton>
  );
};
