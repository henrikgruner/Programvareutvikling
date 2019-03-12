import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components/macro";
import ScrollToTop from "./utils/scrollToTop";

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

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden;
  align-items: center;
`;

export const ContentWrapper = styled.div`
  max-width: var(--page-max-width);
  margin: 0 auto;
  width: 100%;
  flex: 1 0 auto;
`;

const App = () => (
  <Router>
    <ScrollToTop>
      <PageWrapper>
        <Header />
        <ContentWrapper>
          <Switch>
            <Route exact path="/" component={FrontPage} />
            <Route exact path="/profile" component={ProfilePage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/signup" component={SignUpPage} />
            <Route exact path="/delete" component={DeleteProfilePage} />
            <Route
              path="/auctions"
              render={({ match: { url } }) => (
                <Switch>
                  <Route exact path={`${url}/`} component={FrontPage} />
                  <Route
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
        </ContentWrapper>
        <Footer />
      </PageWrapper>
    </ScrollToTop>
  </Router>
);

export default App;
