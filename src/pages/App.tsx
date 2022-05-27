import { NotFound } from "pages/error/NotFound";
import { LoginPage } from "pages/login/LoginPage";
import { PrivateRoute } from "pages/PrivateRoute";
import { Container as AccountRegisterPage } from "pages/terms/account/Container";
import { Container as DutyFreePage } from "pages/terms/tax/Container";
import { Container as TravelBasic } from "pages/travel/basic/Container";
import { Container as TravelImmigration } from "pages/travel/immigration/Container";
import { Container as TravelDeparture } from "pages/travel/departure/Container";
import { Container as TravelPlaceToStay } from "pages/travel/placeToStay/Container";
import { Container as TravelerBasic } from "pages/traveler/basic/Container";
import { Container as TravelerPassport } from "pages/traveler/passport/Container";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

/**
 * ドキュメントroot
 *
 * @returns 表示ページ
 */
export const App = (): JSX.Element => {
  // url定義外ページアクセス時はnot found
  return (
    <Router>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="terms">
          <Route path="account" element={<AccountRegisterPage />} />
          <Route path="tax" element={<DutyFreePage />} />
        </Route>
        <Route path="travel">
          <Route
            path="basic"
            element={<PrivateRoute element={<TravelBasic />} />}
          />
          <Route
            path="immigration"
            element={<PrivateRoute element={<TravelImmigration />} />}
          />
          <Route
            path="departure"
            element={<PrivateRoute element={<TravelDeparture />} />}
          />
          <Route
            path="placeToStay"
            element={<PrivateRoute element={<TravelPlaceToStay />} />}
          />
        </Route>
        <Route path="traveler">
          <Route path="basic" element={<TravelerBasic />} />
          <Route path="passport" element={<TravelerPassport />} />
        </Route>
        <Route path="/" element={<PrivateRoute element={<TravelBasic />} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
