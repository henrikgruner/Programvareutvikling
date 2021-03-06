import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components/macro";
import ScrollToTop from "./utils/scrollToTop";
import PrivateRoute from "./PrivateRoute";

import Header from "./components/Header";
import Footer from "./components/Footer";

// Routes
import FrontPage from "./routes/FrontPage";
import ProfilePage from "./routes/ProfilePage";
import LoginPage from "./routes/LoginPage";
import SignUpPage from "./routes/SignUpPage";
import AuctionPage from "./routes/AuctionPage";
import NotFoundPage from "./routes/NotFoundPage";
import CreateAuctionPage from "./routes/CreateAuctionPage";
import DeleteProfilePage from "./routes/DeleteProfilePage";
import ReportPage from "./routes/ReportPage";
import EditProfilePage from "./routes/EditProfilePage";
import StatisticsPage from "./routes/StatisticsPage";
import ChangePassword from "./routes/ChangePassword";

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden;
  align-items: center;
`;

const App = () => (
  <Router>
    <ScrollToTop>
      <PageWrapper>
        <Header />

        <Switch>
          <Route exact path="/" component={FrontPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignUpPage} />
          <Route exact path="/statistics" component={StatisticsPage} />

          <Route
            path="/profile"
            render={({ match: { url } }) => (
              <Switch>
                <PrivateRoute exact path={`${url}/`} component={ProfilePage} />
                <PrivateRoute
                  exact
                  path={`${url}/delete-me`}
                  component={DeleteProfilePage}
                />
                <PrivateRoute
                  exact
                  path={`${url}/edit-me`}
                  component={EditProfilePage}
                />

                <PrivateRoute
                  exact
                  path={`${url}/change-password`}
                  component={ChangePassword}
                />

                <Route component={NotFoundPage} />
              </Switch>
            )}
          />
          <PrivateRoute exact path="/report" component={ReportPage} />
          <Route
            path="/auctions"
            render={({ match: { url } }) => (
              <Switch>
                <Route exact path={`${url}/`} component={FrontPage} />
                <PrivateRoute
                  exact
                  path={`${url}/new`}
                  component={CreateAuctionPage}
                />
                <Route
                  exact
                  path={`${url}/:auctionId`}
                  component={AuctionPage}
                />
              </Switch>
            )}
          />
          <Route component={NotFoundPage} />
        </Switch>
        <Footer />
      </PageWrapper>
    </ScrollToTop>
  </Router>
);

export default App;
