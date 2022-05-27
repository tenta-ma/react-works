import { Card, CardContent, Stack, Typography } from "@mui/material";
import { ErrorFallback } from "component/error/ErrorFallback";
import { Footer } from "component/footer/Footer";
import { Header } from "component/header/Header";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useTranslation } from "react-i18next";

/**
 * 免税利用
 *
 * @returns 免税利用画面
 */
export const Container = (): JSX.Element => {
  const { t } = useTranslation("translation", { keyPrefix: "terms.tax" });
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Header />
      <Stack direction="column" alignItems="center" spacing={2}>
        <Typography variant="h5" fontWeight="bold">
          後で作るし、ここは消す
        </Typography>
        <Typography
          variant="h5"
          fontWeight="bold"
          color="primary"
          data-testid="title">
          {t("title")}
        </Typography>
        <Typography variant="body1" data-testid="title">
          {t("description")}
        </Typography>
        <Card color="primary">
          <CardContent>{t("purpose.content")}</CardContent>
        </Card>
      </Stack>
      <Footer />
    </ErrorBoundary>
  );
};
