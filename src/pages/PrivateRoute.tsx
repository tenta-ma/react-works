import { isAuthenticated } from "component/authentication/Token";
import { Navigate } from "react-router-dom";
import { PagePath } from "_const/PagePath";

/**
 * PrivateRoute
 * 未認証の場合、ログイン画面にリダイレクト
 *
 * @param element 表示したい画面
 * @returns 遷移先画面
 */
export const PrivateRoute: React.FC<{
  element: JSX.Element;
}> = ({ element }): JSX.Element => {
  if (isAuthenticated()) {
    // 認証OKであればしかるべきページの表示
    return element;
  } else {
    // 未認証はログイン画面表示
    return <Navigate to={{ pathname: PagePath.login }} />;
  }
};
