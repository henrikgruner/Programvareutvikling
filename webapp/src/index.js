import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components/macro";

import "./utils/global.css";
import ScrollToTop from "./utils/scrollToTop";

import Header from "./components/Header";
import Footer from "./components/Footer";

// Routes
import FrontPage from "./routes/FrontPage";
import ProfilePage from "./routes/ProfilePage";
import LoginPage from "./routes/LoginPage";
import SignUpPage from "./routes/SignUpPage";
import NotFoundPage from "./routes/NotFoundPage";
import AuctionPage from "./routes/AuctionPage";

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const ContentWrapper = styled.div`
  max-width: var(--page-max-width);
  margin: 0 auto;
  width: 100%;
  flex: 1 0 auto;
`;

ReactDOM.render(
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
            <Route exact path="/auction" component={AuctionPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </ContentWrapper>
        <Footer />
      </PageWrapper>
    </ScrollToTop>
  </Router>,
  document.getElementById("root")
);
