// This is used to determine if a user is a staff member and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the home page.
import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const StaffRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        staff ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
};

const mapStateToProps = state => {
  return {
    staff: state.user.profile && state.user.profile.user.is_staff
  };
};

export default connect(mapStateToProps)(StaffRoute);
