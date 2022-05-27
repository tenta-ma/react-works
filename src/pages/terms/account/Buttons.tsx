import {
  AddCircle as AddCircleIcon,
  RemoveCircleOutline as RemoveCircleOutlineIcon,
} from "@mui/icons-material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { DefaultButton } from "_assets/MuiStyles";
import { PagePath } from "_const/PagePath";

/**
 * アカウント登録・同意するボタン
 */
export const Agree = (): JSX.Element => {
  const { t } = useTranslation("translation", {
    keyPrefix: "terms.account.button",
  });
  const navigate = useNavigate();
  return (
    <DefaultButton
      data-testid="terms-account-agree-button"
      onClick={() => {
        navigate(PagePath.register.index);
      }}
      size="large"
      variant="contained"
      startIcon={<AddCircleIcon />}>
      {t("agree")}
    </DefaultButton>
  );
};

/**
 * アカウント登録・同意しないボタン
 */
export const Reject = (): JSX.Element => {
  const { t } = useTranslation("translation", {
    keyPrefix: "terms.account.button",
  });
  const navigate = useNavigate();
  return (
    <DefaultButton
      data-testid="terms-account-reject-button"
      onClick={() => {
        navigate(PagePath.login);
      }}
      size="large"
      variant="outlined"
      startIcon={<RemoveCircleOutlineIcon />}>
      {t("reject")}
    </DefaultButton>
  );
};
