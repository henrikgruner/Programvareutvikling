import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import { StyledLink } from "../StyledLink";
import { media } from "../../utils/mediaQueries";

export const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: var(--background-color);
  height: 100px;
  width: 100%;
  max-width: var(--page-max-width);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

export const SubTitle = styled.h2`
  display: flex;
  font-style: italic;
  font-size: 13px;
  opacity: 0.7;
  letter-spacing: 0.5px;

  ${media.tablet`
      position:absolute;
      left: 4rem;
      top: 55px;
    `};
`;

export const CompanyLogoText = styled.span`
  font-size: 30px;
  color: var(--primary-color);
  margin-left: 10px;
  margin-top: 2px;
  letter-spacing: -1px;
`;

export const CompanyLogo = styled.img`
  width: 50px;
  max-height: 50px;
  object-fit: scale-down;
`;

export const CompanyLogoWrapper = styled(Link)`
  display: flex;
  flex: 2;
  CompanyLogoWrapper.displayName = 'Name';
  &:hover {
    opacity: 0.9;
    text-decoration: none;
    transition: opacity 0.2s;
  }
`;

export const AuthLink = styled(StyledLink)`
  font-size: 1em;
  font-weight: bold;
  margin: auto 10px;

  &:hover {
    opacity: 0.9;
    text-decoration: underline;
    transition: opacity 0.2s;
  }
`;

export const AuthLinkWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 2;
`;
