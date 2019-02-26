import React, { Component } from "react";
import { Menu } from "antd";
import {
  Title,
  HeaderWrapper,
  CompanyLogo,
  AuthLink,
  AuthLinkWrapper
} from "./styles.js";

class Header extends Component {
  render() {
    return (
      <HeaderWrapper>
        <CompanyLogo to="/">BudBua AS</CompanyLogo>
        <Title>Velkommen til Norges største og eldste auksjonsmarked</Title>

        <AuthLink to="/auctions/new">Ny auksjon</AuthLink>

        <AuthLinkWrapper>
          {this.props.isAuthenticataed ? (
            <Menu.Item key="2" onClick={this.props.logout}>
              Logout
            </Menu.Item>
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

export default Header;
