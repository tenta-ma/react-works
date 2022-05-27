import {
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  CameraAlt as CameraAltIcon,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { DefaultButton } from "_assets/MuiStyles";
import { PagePath } from "_const/PagePath";

/**
 * カメラ起動ボタン
 *
 * @param launchCamera カメラ起動処理
 * @return 「次へ」ボタン
 */
export const LaunchCamera: React.FC<{ launchCamera: () => void }> = ({
  launchCamera,
}): JSX.Element => {
  const { t } = useTranslation("translation", {
    keyPrefix: "traveler.passport.button",
  });
  return (
    <DefaultButton
      size="large"
      onClick={launchCamera}
      variant="contained"
      startIcon={<CameraAltIcon />}
      sx={{ width: "16rem" }}>
      {t("launchCamera")}
    </DefaultButton>
  );
};

/**
 * 次へボタン
 *
 * @param disable 非活性状態
 * @return 「次へ」ボタン
 */
export const Next: React.FC<{ disable: boolean }> = ({
  disable,
}): JSX.Element => {
  const { t } = useTranslation("translation", {
    keyPrefix: "traveler.passport.button",
  });
  return (
    <DefaultButton
      data-testid="terms-account-agree-button"
      size="large"
      variant="contained"
      disabled={disable}
      startIcon={<ArrowForwardIcon />}
      sx={{ width: "10rem" }}>
      {t("next")}
    </DefaultButton>
  );
};

/**
 * 戻るボタン
 *
 * @return 「戻る」ボタン
 */
export const Back = (): JSX.Element => {
  const { t } = useTranslation("translation", {
    keyPrefix: "traveler.passport.button",
  });
  const navigate = useNavigate();
  const toBasic = (): void => {
    navigate(PagePath.traveler.basic);
  };

  return (
    <DefaultButton
      data-testid="terms-account-agree-button"
      onClick={toBasic}
      size="large"
      variant="outlined"
      startIcon={<ArrowBackIcon />}
      sx={{ width: "10rem" }}>
      {t("back")}
    </DefaultButton>
  );
};
