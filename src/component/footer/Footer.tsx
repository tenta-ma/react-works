import { Stack, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

/**
 * フッター
 *
 * @returns フッター
 */
export const Footer = (): JSX.Element => {
  const { t } = useTranslation("common", { keyPrefix: "footer" });
  return (
    <Stack
      data-testid="footer"
      direction="row"
      justifyContent="center"
      alignItems="center"
      p={1}>
      <Typography variant="body2" data-testid="copyRight">
        {t("copyRight")}
      </Typography>
    </Stack>
  );
};
