import React from "react";
import {
  SubTitle,
  HeaderWrapper,
  CompanyLogoText,
  CompanyLogo,
  CompanyLogoWrapper,
  AuthLink,
  AuthLinkWrapper
} from "./styles.js";
import logo from "../../assets/budBuaLogo.png";
import { connect } from "react-redux";
import { logoutUser } from "../../store/actions/auth";

const Header = props => {
  return (
    <HeaderWrapper {...props}>
      <CompanyLogoWrapper to="/">
        <CompanyLogo src={logo} alt="Budbua logo" />
        <CompanyLogoText>Auksjonsbua</CompanyLogoText>
      </CompanyLogoWrapper>
      <SubTitle>Velkommen til Norges største og eldste auksjonsmarked</SubTitle>
      <AuthLinkWrapper>
        {props.isAuthenticated ? (
          <>
            <AuthLink to="/auctions/new">Ny auksjon</AuthLink>
            <span>|</span>
            <AuthLink to="/" onClick={props.logoutUser}>
              Logg ut
            </AuthLink>
            <span>|</span>
            <AuthLink to="/profile">Min profil</AuthLink>
          </>
        ) : (
            <>
              <AuthLink to="/login">Logg inn</AuthLink>
              <span>|</span>
              <AuthLink to="/signup">Ny bruker</AuthLink>
            </>
          )}
      </AuthLinkWrapper>
      {props.children}
    </HeaderWrapper>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.authenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => dispatch(logoutUser())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
