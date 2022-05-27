import { Stack, Typography } from "@mui/material";
import { Tutorial } from "component/backdrop/Tutorial";
import { ErrorFallback } from "component/error/ErrorFallback";
import { Footer } from "component/footer/Footer";
import { Header } from "component/header/Header";
import { finishedTutorial } from "component/storage/TravelInformation";
import { Form as BasicInformationForm } from "pages/travel/basic/Form";
import { TravelHeader } from "pages/travel/TravelHeader";
import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useTranslation } from "react-i18next";
import { CircledText } from "_assets/MuiStyles";

/**
 * 旅行情報/基本情報
 *
 * @returns 旅行情報/基本情報画面
 */
export const Container = (): JSX.Element => {
  const { t } = useTranslation("translation", { keyPrefix: "travel.basic" });

  // FIXME: チュートリアル表示のトリガーを決定する必要あり
  const [openTutorial, setOpenTutorial] = useState<boolean>(
    !finishedTutorial()
  );

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Tutorial open={openTutorial} setOpen={setOpenTutorial}></Tutorial>
      <Stack direction="column" minHeight={"100vh"}>
        <Header />
        <TravelHeader activeIndex={0} />
        <Stack direction="column" spacing={2} flexGrow={1}>
          <Stack
            direction="row"
            spacing={1}
            p={1}
            sx={{ backgroundColor: "#D6F3FF" }}>
            <CircledText>1</CircledText>
            <Typography variant="body1" data-testid="title">
              {t("title")}
            </Typography>
          </Stack>
          <BasicInformationForm />
        </Stack>
        <Footer />
      </Stack>
    </ErrorBoundary>
  );
};
