import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./utils/global.css";
import ScrollToTop from "./utils/scrollToTop";

// Routes
import FrontPage from "./routes/FrontPage";
import ProfilePage from "./routes/ProfilePage";
import LoginPage from "./routes/LoginPage";
import SignUpPage from "./routes/SignUpPage";
import NotFoundPage from "./routes/NotFoundPage";
import AuctionPage from "./routes/AuctionPage";

ReactDOM.render(
  <Router>
    <ScrollToTop>
      <Switch>
        <Route exact path="/" component={FrontPage} />
        <Route exact path="/profile" component={ProfilePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={SignUpPage} />
        <Route exact path="/auction" component={AuctionPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </ScrollToTop>
  </Router>,
  document.getElementById("root")
);
