import {
  CameraAlt as CameraAltIcon,
  Cameraswitch as CameraswitchIcon,
} from "@mui/icons-material/";
import { Box, Dialog, Stack } from "@mui/material";
import { MutableRefObject, useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { ButtonArea, DefaultButton } from "_assets/MuiStyles";

// FIXME: これが必要になったらソース整理を行う

const canvasReloadMilli = 100;

const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";

const videoConstraints = {
  facingMode: FACING_MODE_USER,
};

/**
 * カメラから規定範囲を切り出す処理
 *
 * 処理としては
 * カメラ(html上非表示)をcanvas(その1)に表示
 * canvas(その1)で表示時に追加で矩形用の赤枠も表示
 * 画面の表示上ではcanvas(その1)が表示される
 *
 * 撮影ボタンを押すと、canvas(その1)から矩形赤枠範囲のcanvas(その2:内部変数)を作り
 * それをimg化する
 */
export const PassportCapture: React.FC<{
  setImg: React.Dispatch<React.SetStateAction<string>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setImg, open, setOpen }) => {
  const [facingMode, setFacingMode] = useState(FACING_MODE_ENVIRONMENT);

  // カメラの前面・背面の切り替え
  const toggleCameraFacing = useCallback(() => {
    setFacingMode((prevState) =>
      prevState === FACING_MODE_USER
        ? FACING_MODE_ENVIRONMENT
        : FACING_MODE_USER
    );
  }, []);

  // カメラ(非表示)
  const webcamRef: MutableRefObject<Webcam> = useRef<Webcam>(null!);
  // カメラを同期的に表示するcanvas
  const canvasRef: MutableRefObject<HTMLCanvasElement> =
    useRef<HTMLCanvasElement>(null!);

  const cropper: MutableRefObject<Cropper> = useRef<Cropper>({
    xStart: 0,
    yStart: 0,
    width: 0,
    height: 0,
  });

  // カメラからのcanvasへの同期的描画
  const drawImge = (): void => {
    const video: Webcam = webcamRef.current;

    if (!video || !video.video) {
      return;
    }
    const videoElement: HTMLVideoElement = video.video;
    // 2d描画用のcanvas object
    const canvas: HTMLCanvasElement = canvasRef.current;
    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    const videoAspect: number =
      videoElement.videoWidth / videoElement.videoHeight;

    canvas.width = window.screen.width;
    canvas.height = canvas.width / videoAspect;

    ctx.drawImage(
      videoElement,
      0,
      0,
      videoElement.videoWidth,
      videoElement.videoHeight,
      0,
      0,
      canvas.width,
      canvas.height
    );

    const widthRetio: number = 0.9;

    const cropWidth: number = Math.floor(canvas.width * widthRetio);
    // パスポートはB7サイズらしいので、ルート２
    // 16x9のpcだと縦が足りないため、カメラ枠retioとより小さい方
    const cropHeight = Math.floor(
      Math.min(cropWidth / 1.41, canvas.height * widthRetio)
    );
    const pX = Math.floor(canvas.width / 2 - cropWidth / 2);
    const pY = Math.floor(canvas.height / 2 - cropHeight / 2);

    cropper.current = {
      xStart: pX,
      yStart: pY,
      width: cropWidth,
      height: cropHeight,
    };

    // 出力予定の赤枠描画
    const lineWidth: number = 3;
    ctx.rect(
      pX - lineWidth,
      pY - lineWidth,
      cropWidth + lineWidth * 2,
      cropHeight + lineWidth * 2
    );
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = "red";
    ctx.stroke();

    setTimeout(drawImge, canvasReloadMilli);
  };
  setTimeout(drawImge, canvasReloadMilli);

  // 指定範囲の画像を取得してモーダルを閉じる
  const cropping = (): void => {
    const video: Webcam = webcamRef.current;
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    // const canvas: HTMLCanvasElement = canvas2Ref.current;
    if (!video || !video.video) {
      return;
    }

    // 2d描画用のcanvas object
    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    // 出力用のcanvasを描画
    canvas.width = cropper.current.width;
    canvas.height = cropper.current.height;
    ctx.drawImage(
      canvasRef.current,
      cropper.current.xStart,
      cropper.current.yStart,
      cropper.current.width,
      cropper.current.height,
      0,
      0,
      cropper.current.width,
      cropper.current.height
    );

    setImg(canvas.toDataURL());
    // カメラ起動自体を閉じる
    setOpen(false);
  };

  return (
    <Dialog fullScreen open={open}>
      <Stack spacing={2} alignItems="center">
        <Box>
          <Webcam
            audio={false}
            muted={false}
            ref={webcamRef}
            screenshotFormat="image/png"
            screenshotQuality={1}
            style={{
              // ユーザーへのUIはcanvasで行うため、カメラ自体は非表示
              display: "none",
            }}
            videoConstraints={{
              ...videoConstraints,
              // FIXME: カメラサイズは要検討
              width: { min: 1280, ideal: 1920, max: 2560 },
              height: { min: 720, ideal: 1080, max: 1440 },
              facingMode,
            }}
          />
        </Box>
        <canvas ref={canvasRef} />
        {/* FIXME: ボタンのUIをoverlay化しないと使いずらい */}
        <ButtonArea>
          <CaptureButton capture={cropping} />
          <DefaultButton
            size="large"
            onClick={toggleCameraFacing}
            variant="outlined"
            startIcon={<CameraswitchIcon />}
            sx={{
              width: "10rem",
            }}>
            swicth
          </DefaultButton>
        </ButtonArea>
      </Stack>
    </Dialog>
  );
};

/**
 * 画像取得
 *
 * @return 画像取得ボタン
 */
const CaptureButton: React.FC<{
  capture: () => void;
}> = ({ capture }): JSX.Element => {
  return (
    <DefaultButton
      size="large"
      onClick={capture}
      variant="contained"
      startIcon={<CameraAltIcon />}
      sx={{ width: "10rem" }}>
      SHOOT
    </DefaultButton>
  );
};

type Cropper = {
  xStart: number;
  yStart: number;
  width: number;
  height: number;
};
