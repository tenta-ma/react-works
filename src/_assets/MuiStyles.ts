import { Box, Button, CardContent, CSSObject, Stack } from "@mui/material";
import { createTheme, styled } from "@mui/material/styles";
import { DefaultTheme } from "@mui/private-theming";

// システム共通的なstyles定義を設定した
// MUIの拡張コンポーネント

/**
 * スクロールバーのstyle css
 * スクロールバーに対してpaddingを設定
 * hint. youtube likeに普段非表示にする場合
 * -webkit-scrollbar display: noneを個別に設定すれば、hover時のみ表示となる
 *
 * @see https://stackoverflow.com/questions/21684101/css-vertical-scrollbar-padding-left-right-in-ul-possible
 */
const scrollbarStyle: CSSObject = {
  "::-webkit-scrollbar": {
    display: "inline",
    width: "12px",
    height: "12px",
  },
  // スクロールバーの「つまみ」
  "::-webkit-scrollbar-thumb": {
    backgroundColor: "gray",
    borderRadius: "6px",

    border: "2px solid transparent",
    backgroundClip: "padding-box",
  },
  // スクロールバー背景
  "::-webkit-scrollbar-track": {
    margin: "4px",
  },
  ":hover": {
    "::-webkit-scrollbar": {
      display: "inline",
      width: "12px",
      height: "12px",
    },
  },
};

/**
 * このアプリケーションの標準的なtheme(style)
 */
export const WebApplicationTheme: Partial<DefaultTheme> = createTheme({
  typography: {
    fontFamily: [
      "Helvetica Neue",
      "Arial",
      "Hiragino Kaku Gothic ProN",
      "Hiragino Sans",
      "Meiryo",
      "sans-serif",
    ].join(","),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ...scrollbarStyle,
      },
    },
  },
});

/**
 * 利用規約とかのCardContent
 */
export const TermsCardConent = styled(CardContent)({
  whiteSpace: "pre-line",
  height: "15rem",
  overflowX: "hidden",
  overflowY: "auto",
});

/**
 * このプロジェクトにおけるボタンのベースデザイン
 * Radiusをつけて横に丸みを持たせている
 * また、幅も適当に設定
 */
export const DefaultButton = styled(Button)({
  borderRadius: 24,
  width: "80vw",
  maxWidth: "20rem",
  fontWeight: "bold",
});

/**
 * 囲み文字(青背景、白文字)
 * e.g. ①みたいなやつ
 */
export const CircledText = styled(Box)({
  height: "1.5rem",
  width: "1.5rem",
  borderRadius: "50%",
  textAlign: "center",
  background: "#1976d2",
  color: "#ffffff",
  fontWeight: "bold",
  fontSize: "0.75rem",
  lineHeight: "1.5rem",
});

/**
 * 背景をグラデーション化したBox
 */
export const GradientBox = styled(Box)({
  background: "linear-gradient(45deg, #0A4DFF 0%, #5BB6FF 100%)",
  color: "#ffffff",
});

/**
 * ボタンを一列に横並びに等間隔で並べるStack
 */
export const ButtonArea = styled(Stack)({
  alignItems: "center",
  justifyContent: "space-around",
  flexDirection: "row",
});
