import { Link } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { PagePath } from "_const/PagePath";

/**
 * パスワード忘れリンク
 */
export const ForgotPassword = (): JSX.Element => {
  const { t } = useTranslation("translation", { keyPrefix: "login" });
  const navigate = useNavigate();
  return (
    <Link
      data-testid="forgot-Password-link"
      underline="always"
      onClick={() => {
        navigate(PagePath.forgotpassword);
      }}>
      {t("forgotPassword")}
    </Link>
  );
};
