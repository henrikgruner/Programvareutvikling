import React from "react";
import {
  SubTitle,
  HeaderWrapper,
  InnerHeaderWrapper,
  CompanyLogoText,
  CompanyLogo,
  CompanyLogoWrapper,
  NavLink,
  CurrentUser,
  NavLinkWrapper,
  LogoutButton
} from "./styles.js";
import logo from "../../assets/budBuaLogo.png";
import { connect } from "react-redux";
import { logoutUser } from "../../store/actions/auth";

const Header = props => {
  return (
    <HeaderWrapper>
      <InnerHeaderWrapper>
        <div>
          <CompanyLogoWrapper to="/">
            <CompanyLogo src={logo} alt="Budbua logo" />
            <CompanyLogoText>Auksjonsbua</CompanyLogoText>
          </CompanyLogoWrapper>
          <SubTitle>
            Velkommen til Norges største og eldste auksjonsmarked
          </SubTitle>
        </div>
        <NavLinkWrapper>
          {props.isAuthenticated ? (
            <>
              <NavLink to="/auctions/new">Ny auksjon</NavLink>
              {props.user && props.user.is_staff && (
                <NavLink to="/statistics">statistikk</NavLink>
              )}
              <NavLink to="/profile">Min side</NavLink>

              <CurrentUser>
                <span>Du er logget inn som</span>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    textAlign: "center"
                  }}
                >
                  {props.user && props.user.first_name}
                </div>
                <LogoutButton onClick={props.logoutUser}>Logg ut</LogoutButton>
              </CurrentUser>
            </>
          ) : (
            <>
              <NavLink to="/login">Logg inn</NavLink>
              <NavLink to="/signup">Ny bruker</NavLink>
            </>
          )}
        </NavLinkWrapper>

        {props.children}
      </InnerHeaderWrapper>
    </HeaderWrapper>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.authenticated,
    user: state.user.profile && state.user.profile.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => dispatch(logoutUser())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(Header);
