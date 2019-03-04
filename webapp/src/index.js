import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components/macro";
import { PersistGate } from "redux-persist/integration/react";

import "./utils/global.css";
import ScrollToTop from "./utils/scrollToTop";

import Header from "./components/Header";
import Footer from "./components/Footer";

import store from "./store/configureStore";
import { Provider } from "react-redux";

// Routes
import FrontPage from "./routes/FrontPage";
import ProfilePage from "./routes/ProfilePage";
import LoginPage from "./routes/LoginPage";
import SignUpPage from "./routes/SignUpPage";
import AuctionPage from "./routes/AuctionPage";
import NotFoundPage from "./routes/NotFoundPage";
import CreateAuctionPage from "./routes/CreateAuctionPage";

const redux = store();

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

ReactDOM.render(
  <Provider store={redux.store}>
    <PersistGate persistor={redux.persistor}>
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
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
