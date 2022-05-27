import { Stack, Typography } from "@mui/material";
import { ErrorFallback } from "component/error/ErrorFallback";
import { Footer } from "component/footer/Footer";
import { Header } from "component/header/Header";
import { Register as RegisterButton } from "pages/login/Buttons";
import { Form as LoginForm } from "pages/login/Form";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { DefaultButton } from "_assets/MuiStyles";
import { PagePath } from "_const/PagePath";

/**
 * ログイン画面
 *
 * @returns ログイン画面
 */
export const LoginPage = (): JSX.Element => {
  const { t } = useTranslation("common");

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Stack direction="column" minHeight={"100vh"}>
        <Header />
        <Stack direction="column" alignItems="center" spacing={2} flexGrow={1}>
          <Typography
            variant="h4"
            fontWeight="bold"
            mt={5}
            data-testid="appliName">
            {t("applicationName")}
          </Typography>
          <LoginForm />
          <RegisterButton />
          <TestButton />
        </Stack>
        <Footer />
      </Stack>
    </ErrorBoundary>
  );
};

// FIXME: 旅行者情報への遷移元が決まったら削除する
// 旅行者情報への遷移元がないため、とりあえず作った仮遷移用のボタン
const TestButton = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <DefaultButton
      onClick={() => {
        navigate(PagePath.traveler.basic);
      }}
      variant="contained"
      color="secondary"
      size="large">
      テスト
    </DefaultButton>
  );
};
