import { Card, CardHeader, CardMedia } from "@mui/material";
import React from "react";
import { DropzoneState, useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import passportImg from "_assets/images/passport.png";

// FIXME: Dropzone & File Uploadはroadmapに記載されている将来実装される機能のため
// ここではFileDropzoneを利用しつつ、デザインをMUIに寄せる
/**
 * ファイルアップロード
 *
 * @returns ファイルアップロードinput
 *
 */
export const FileDropzone: React.FC<{
  file: string;
  setFile: React.Dispatch<React.SetStateAction<string>>;
}> = ({ file, setFile }): JSX.Element => {
  const { t } = useTranslation("translation", {
    keyPrefix: "traveler.passport.image",
  });
  // dropzone
  const { getRootProps, getInputProps }: DropzoneState = useDropzone({
    accept: { "image/*": [] },
    onDrop: (files) => fileToDataUrl(files[0]).then(setFile),
    multiple: false,
  });

  return (
    <React.Fragment>
      <Card
        {...getRootProps({})}
        sx={{
          marginTop: 0,
          // borderをMUIのinput要素に似せている
          borderWidth: "0.5px",
          borderStyle: "solid",
          borderColor: "rgba(0, 0, 0, 0.2)",
          borderRadius: "4px",
        }}>
        <input
          {...getInputProps()}
          data-testid="input-file"
          id="passport-file"
        />
        <CardHeader
          title={t("description")}
          titleTypographyProps={{ fontSize: "1rem" }}
          subheader={t("attention")}
          subheaderTypographyProps={{ fontSize: "0.8rem" }}
        />
        <CardMedia
          component="img"
          src={file ? file : passportImg}
          alt=""
          sx={{
            backgroundColor: "#bbbbbb",
            height: "14rem",
            objectFit: "contain",
          }}
        />
      </Card>
    </React.Fragment>
  );
};

/**
 * fileをdata urlに変換する
 *
 * @param file stringのdata url に変換するファイル
 * @return fileをdata urlに変換する
 */
const fileToDataUrl = (file: File): Promise<string> => {
  const fileData: Promise<string> = new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (!reader.result || reader.result instanceof ArrayBuffer) {
        reject("file is you");
      } else {
        resolve(reader.result);
      }
    };
  });
  return fileData;
};
