import { Stack, Typography } from "@mui/material";
import { ErrorFallback } from "component/error/ErrorFallback";
import { Footer } from "component/footer/Footer";
import { Header } from "component/header/Header";
import { Form as ImmigrationInformationForm } from "pages/travel/immigration/Form";
import { TravelHeader } from "pages/travel/TravelHeader";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useTranslation } from "react-i18next";
import { CircledText } from "_assets/MuiStyles";

/**
 * 旅行情報/入国情報
 *
 * @returns 旅行情報/入国情報画面
 */
export const Container = (): JSX.Element => {
  const { t } = useTranslation("translation", {
    keyPrefix: "travel.immigration",
  });
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Header />
      <TravelHeader activeIndex={1} />
      <Stack direction="column" spacing={2}>
        <Stack
          direction="row"
          spacing={1}
          p={1}
          sx={{ backgroundColor: "#D6F3FF" }}>
          <CircledText>2</CircledText>
          <Typography variant="body1" data-testid="title">
            {t("title")}
          </Typography>
        </Stack>
        <ImmigrationInformationForm />
      </Stack>
      <Footer />
    </ErrorBoundary>
  );
};
