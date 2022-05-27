import {
  AccountCircle,
  Lock as LockIcon,
  Login as LoginIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Alert,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { login } from "component/api/auth/Login";
import { isAuthenticated, saveToken } from "component/authentication/Token";
import { ForgotPassword as ForgotPasswordLink } from "pages/login/Links";
import React, {
  MutableRefObject,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { DefaultButton } from "_assets/MuiStyles";
import { PagePath } from "_const/PagePath";

/**
 * エラーなし時のメッセージ
 * mui helperTextの都合上、空文字の場合無し扱いになるため
 * 初期時に空行を設定するために用意
 */
const noErrorMessage: string = " ";

/**
 * ログインフォーム
 *
 * @returns ログインフォーム
 */
export const Form = (): JSX.Element => {
  const navigate = useNavigate();
  const { t } = useTranslation("translation", { keyPrefix: "login" });

  const [authed, setAuthed] = useState<boolean>(false);

  const [submitted, setSubmitted] = useState<boolean>(false);

  // form parameters
  const loginIdRef = useRef<HTMLInputElement>(null!);
  const passwordRef = useRef<HTMLInputElement>(null!);
  const rememberMe: MutableRefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null!);

  // validation massage
  const [errorMessage, setErrorMessage] = useState({
    loginId: noErrorMessage,
    password: noErrorMessage,
  });

  // ログイン認証
  const auth = (): void => {
    setSubmitted(true);
    // FIXME: 入力チェックとかする
    const loginId: string = loginIdRef.current.value;
    let idErrorMessage: string = noErrorMessage;
    if (!loginId) {
      idErrorMessage = t("mailaddress.error.empty");
    }
    const password: string = passwordRef.current.value;
    let passwordErrorMessage: string = noErrorMessage;
    if (!password) {
      passwordErrorMessage = t("password.error.empty");
    }

    setErrorMessage({
      loginId: idErrorMessage,
      password: passwordErrorMessage,
    });

    if (!loginId || !password) {
      // validationエラーで処理終了
      return;
    }

    login(loginId, password)
      .then((token: string) => {
        console.log("token is " + token);

        // FIXME: 認証成功/失敗の時の処理を記述
        saveToken(token);

        return !!token;
      })
      .then(setAuthed)
      .catch((error) => {
        // エラーの時の処理を記述
      });
  };

  // 認証によるhook、認証中ならログイン不要でhomeに飛ばす
  useEffect(() => {
    if (isAuthenticated()) {
      navigate(PagePath.home);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authed]);

  return (
    <Stack direction="column" alignItems="center" spacing={1} mt={1}>
      <LoginId
        inputRef={loginIdRef}
        hasError={submitted && !!errorMessage.loginId.trim()}
        errorMessage={errorMessage.loginId}
      />
      <Password
        inputRef={passwordRef}
        hasError={submitted && !!errorMessage.password.trim()}
        errorMessage={errorMessage.password}
      />
      {submitted &&
        !!loginIdRef.current.value &&
        !!passwordRef.current.value && (
          <Alert severity="error">{t("authentication.failure")}</Alert>
        )}
      <RememberMe inputRef={rememberMe} />
      <ForgotPasswordLink />
      <AuthButton auth={auth} />
    </Stack>
  );
};

/**
 * ログインID
 *
 * @param inputRef ログインID
 * @param hasError 検証エラーが発生しているか
 * @param errorMessage エラー発生時のメッセージ
 * @returns ログインID
 */
const LoginId: React.FC<{
  inputRef: MutableRefObject<HTMLInputElement>;
  hasError: boolean;
  errorMessage: string;
}> = ({ inputRef, hasError, errorMessage }): JSX.Element => {
  const { t } = useTranslation("translation", {
    keyPrefix: "login.mailaddress",
  });

  return (
    <TextField
      helperText={errorMessage}
      error={hasError}
      sx={{ width: "80vw", maxWidth: "20rem" }}
      id="mui-email"
      inputRef={inputRef}
      label={t("label")}
      data-testid="mui-email"
      required
      inputProps={{
        type: "email",
        name: "input-email",
        "data-testid": "input-email",
      }}
      // TextField のstartAdornmentは「I(大文字)」nputpropsのため注意
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <AccountCircle />
          </InputAdornment>
        ),
      }}
    />
  );
};

/**
 * パスワード
 *
 * @param inputRef パスワード
 * @param hasError 検証エラーが発生しているか
 * @param errorMessage エラー発生時のメッセージ
 * @returns パスワード入力
 */
const Password: React.FC<{
  inputRef: MutableRefObject<HTMLInputElement>;
  hasError: boolean;
  errorMessage: string;
}> = ({ inputRef, hasError, errorMessage }): JSX.Element => {
  const { t } = useTranslation("translation", { keyPrefix: "login.password" });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // password表示の切り替え
  const toggleShow = (): void => {
    setShowPassword(!showPassword);
  };

  return (
    <FormControl variant="outlined" error={hasError}>
      <InputLabel htmlFor="outlined-adornment-password">
        {t("label")} *
      </InputLabel>
      <OutlinedInput
        label={t("label")}
        required
        inputRef={inputRef}
        sx={{ width: "80vw", maxWidth: "20rem" }}
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        startAdornment={
          <InputAdornment position="start">
            <LockIcon />
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={toggleShow}
              edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      <FormHelperText>{errorMessage}</FormHelperText>
    </FormControl>
  );
};

/**
 * ログイン認証ボタン
 */
const AuthButton: React.FC<{
  auth: () => void;
}> = ({ auth }): JSX.Element => {
  const { t } = useTranslation("translation", { keyPrefix: "login" });
  return (
    <DefaultButton
      onClick={auth}
      size="large"
      variant="contained"
      startIcon={<LoginIcon />}>
      {t("button.login")}
    </DefaultButton>
  );
};

/**
 * ログインしたままにするchckBox
 */
export const RememberMe: React.FC<{
  inputRef: RefObject<HTMLInputElement>;
}> = ({ inputRef }): JSX.Element => {
  const { t } = useTranslation("translation", {
    keyPrefix: "login.rememberMe",
  });
  const label: string = t("label");
  return (
    <FormControlLabel
      control={<Checkbox inputRef={inputRef} />}
      label={label}
    />
  );
};
