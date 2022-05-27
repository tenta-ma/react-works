import { Box, Stack, Typography } from "@mui/material";
import { PassportCapture } from "component/backdrop/PassportCapture";
import { ErrorFallback } from "component/error/ErrorFallback";
import { Footer } from "component/footer/Footer";
import { Header } from "component/header/Header";
import {
  Back as BackButton,
  LaunchCamera as LaunchCameraButton,
  Next as NextButton,
} from "pages/traveler/passport/Buttons";
import { FileDropzone as PassportFile } from "pages/traveler/passport/FileDropzone";
import { TravelerHeader } from "pages/traveler/TravelerHeader";
import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useTranslation } from "react-i18next";
import { ButtonArea, CircledText } from "_assets/MuiStyles";

/**
 * 旅行者情報/旅券情報
 *
 * @returns 旅行者情報/旅券情報画面
 */
export const Container = (): JSX.Element => {
  // パスポート画像
  const [imageSrc, setImage] = useState<string>("");
  // 撮影用カメラoverlay
  const [cameraOpen, setCameraOpen] = useState<boolean>(false);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <PassportCapture
        setImg={setImage}
        open={cameraOpen}
        setOpen={setCameraOpen}
      />
      <Stack minHeight={"100vh"}>
        <Header />
        <TravelerHeader activeIndex={1} />
        <Stack direction="column" spacing={2} flexGrow={1}>
          <TitleBar />
          <Box p={2}>
            <PassportFile file={imageSrc} setFile={setImage} />
          </Box>
          <ButtonArea>
            <LaunchCameraButton
              launchCamera={() => {
                setCameraOpen(true);
              }}
            />
          </ButtonArea>
          <ButtonArea>
            <BackButton />
            <NextButton disable={!imageSrc} />
          </ButtonArea>
        </Stack>
        <Footer />
      </Stack>
    </ErrorBoundary>
  );
};

/**
 * 小タイトル
 *
 * @returns 小タイトル
 */
const TitleBar = (): JSX.Element => {
  const { t } = useTranslation("translation", {
    keyPrefix: "traveler.passport",
  });

  return (
    <Stack
      direction="row"
      spacing={1}
      p={1}
      sx={{ backgroundColor: "#D6F3FF" }}>
      <CircledText>2</CircledText>
      <Typography variant="body1" data-testid="title">
        {t("title")}
      </Typography>
    </Stack>
  );
};
