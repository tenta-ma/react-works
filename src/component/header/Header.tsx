import { AppBar, Box, Link, Toolbar, Typography } from "@mui/material";
import { LanguageSelect } from "component/header/LanguageSelect";
import React from "react";
import { useTranslation } from "react-i18next";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { PagePath } from "_const/PagePath";

/**
 * ヘッダー描画
 *
 * @returns ヘッダー
 */
export const Header = (): JSX.Element => {
  const { t } = useTranslation("common", { keyPrefix: "header" });
  const navigate: NavigateFunction = useNavigate();
  return (
    <AppBar
      data-testid="header"
      position="sticky"
      sx={{
        background: "linear-gradient(to left, #0A4DFF 0%, #5BB6FF 100%)",
      }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Link
            underline="none"
            color={"inherit"}
            onClick={() => {
              navigate(PagePath.home);
            }}>
            <Typography
              variant="h6"
              data-testid="applicationName"
              fontWeight={"bold"}>
              {t("applicationName")}
            </Typography>
          </Link>
        </Box>
        <Box>
          <LanguageSelect
            sxProp={{ background: "#ffffff", height: "2rem", width: "10rem" }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
