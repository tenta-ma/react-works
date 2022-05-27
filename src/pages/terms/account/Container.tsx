import { Card, Stack, Typography } from "@mui/material";
import { ErrorFallback } from "component/error/ErrorFallback";
import { Footer } from "component/footer/Footer";
import { Header } from "component/header/Header";
import {
  Agree as AgreeButton,
  Reject as RejectButton,
} from "pages/terms/account/Buttons";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useTranslation } from "react-i18next";
import { TermsCardConent } from "_assets/MuiStyles";

/**
 * アカウント登録
 *
 * @returns アカウント登録画面
 */
export const Container = (): JSX.Element => {
  const { t } = useTranslation("translation", { keyPrefix: "terms.account" });
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Header />
      <Stack direction="column" spacing={2} p={2}>
        <Typography
          variant="h5"
          fontWeight="bold"
          color="primary"
          data-testid="title">
          {t("title")}
        </Typography>
        <Typography variant="body1" data-testid="description">
          {t("description")}
        </Typography>
        <Card raised sx={{ background: "#efefef" }}>
          <TermsCardConent data-testid="purpose">
            {t("purpose.content")}
          </TermsCardConent>
        </Card>
      </Stack>
      <Stack direction="column" alignItems="center" spacing={2} mt={2}>
        <AgreeButton />
        <RejectButton />
      </Stack>
      <Footer />
    </ErrorBoundary>
  );
};
