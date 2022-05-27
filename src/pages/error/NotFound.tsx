import { Stack, Typography } from "@mui/material";
import { Header } from "component/header/Header";
import { useTranslation } from "react-i18next";

/**
 * Page not found.
 * 制御していないURLへのアクセスで発生
 *
 * @returns エラーページ
 */
export const NotFound = (): JSX.Element => {
  const { t } = useTranslation("translation", { keyPrefix: "notfound" });
  return (
    <Stack direction="column">
      <Header />
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        mt={10}>
        <Typography variant="h4">{t("title")}</Typography>
        <Typography variant="h5">{t("description")}</Typography>
      </Stack>
    </Stack>
  );
};
