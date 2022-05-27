import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { Loader } from "component/backdrop/Loader";
import { App } from "pages/App";
import React, { Suspense } from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import { WebApplicationTheme } from "_assets/MuiStyles";
import "_config/i18n_configs";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

// root 取得
const container: HTMLElement | null = document.getElementById("root");
if (!container) {
  throw new Error("Failed to find the root element");
}
const root: ReactDOM.Root = createRoot(container);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={WebApplicationTheme}>
      <CssBaseline />
      <Suspense fallback={<Loader isLoading={true} />}>
        <App />
      </Suspense>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
