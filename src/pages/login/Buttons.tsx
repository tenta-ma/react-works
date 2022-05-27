import { AddBox as AddBoxIcon } from "@mui/icons-material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { DefaultButton } from "_assets/MuiStyles";
import { PagePath } from "_const/PagePath";

/**
 * 新規アカウント作成画面遷移ボタン
 */
export const Register = (): JSX.Element => {
  const { t } = useTranslation("translation", { keyPrefix: "login" });
  const navigate = useNavigate();
  return (
    <DefaultButton
      data-testid="login-register-button"
      onClick={() => {
        navigate(PagePath.terms.accountregister);
      }}
      size="large"
      variant="outlined"
      startIcon={<AddBoxIcon />}>
      {t("button.register")}
    </DefaultButton>
  );
};
