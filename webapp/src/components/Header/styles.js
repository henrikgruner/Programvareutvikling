import styled from "styled-components/macro";
import { Link, NavLink as RouterNavLink } from "react-router-dom";
import { StyledLink } from "../StyledLink";
import { media } from "../../utils/mediaQueries";

export const HeaderWrapper = styled.header`
  display: flex;
  justify-content: center;
  background-color: var(--background-color);
  height: 90px;
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  font-family: "Raleway", sans-serif;
`;

export const InnerHeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--background-color);
  width: 100%;
  max-width: 1170px;
  position: relative;
`;

export const SubTitle = styled.h2`
  display: flex;
  font-style: italic;
  font-size: 14px;
  opacity: 0.7;
  letter-spacing: 0.5px;
  text-align: center;
  margin: 0;
  position: absolute;
  top: 60px;
  left: 70px;
`;

export const CompanyLogoText = styled.span`
  font-size: 30px;
  color: var(--primary-color);
  margin-left: 10px;
  margin-top: 4px;
  letter-spacing: 1px;
  font-weight: 600;
  font-family: "Open Sans", sans-serif;
`;

export const CompanyLogo = styled.img`
  width: 60px;
  max-height: 60px;
  object-fit: scale-down;
`;

export const CompanyLogoWrapper = styled(Link)`
  display: flex;
  flex: 2;

  &:hover {
    opacity: 0.8;
    text-decoration: none;
    transition: opacity 0.2s;
  }
`;

export const NavLink = styled(RouterNavLink)`
  font-size: 18px;
  margin: auto 12px;
  text-transform: capitalize;
  letter-spacing: 0.5px;
  opacity: 0.7;
  color: var(--font-color);
  font-weight: bold;

  &:hover {
    opacity: 0.9;
    text-decoration: underline;
    transition: opacity 0.2s;
    position: relative;
    text-decoration: none;
  }

  &.active {
    opacity: 1;
    position: relative;
  }

  &:hover::after,
  &.active::after {
    content: "";
    position: absolute;
    top: 25px;
    width: 100%;
    left: 0;
    background-color: var(--primary-color);
    height: 5px;
  }
`;

export const NavLinkWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 2;
  min-width: 300px;
  max-width: 800px;
`;

export const CurrentUser = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
`;

export const LogoutButton = styled.button`
  margin-top: 3px;
  font-family: Raleway, sans-serif;
  border-radius: 0;
  background: none;
  border: 0;
  border-bottom: 1px solid #0532ff;
  color: #0532ff;
  font-weight: bold;
  font-size: 13px;
  cursor: pointer;
`;
