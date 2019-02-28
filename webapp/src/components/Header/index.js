import React, { Component } from "react";
import { Menu } from "antd";
import { Link, withRouter } from "react-router-dom";
import {
  Title,
  HeaderWrapper,
  CompanyLogo,
  AuthLink,
  AuthLinkWrapper
} from "./styles.js";
import { connect } from "react-redux";
import * as actions from "../../store/actions/auth";

class Header extends React.Component {
  render() {
    return (
      <HeaderWrapper {...this.props}>
        <CompanyLogo to="/">BudBua AS</CompanyLogo>
        <Title>Velkommen til Norges største og eldste auksjonsmarked</Title>

        <AuthLink to="/auctions/new">Ny auksjon</AuthLink>

        <AuthLinkWrapper>
          {this.props.isAuthenticated ? (
            <React.Fragment>
              <span onClick={this.props.logout}>
                <AuthLink to="/"> Logout </AuthLink>
              </span>
              <span>|</span>
              <span>
                <AuthLink to="/profile"> Profile </AuthLink>
              </span>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <AuthLink to="/login">Logg inn </AuthLink>
              <span>|</span>
              <AuthLink to="/signup"> Ny bruker</AuthLink>
            </React.Fragment>
          )}
        </AuthLinkWrapper>
        {this.props.children}
      </HeaderWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
