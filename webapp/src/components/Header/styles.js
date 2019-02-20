import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import { StyledLink } from "../StyledLink";

export const Title = styled.h1`
  display: flex;
  font-weight: bold;
  font-size: 12px;
`;

export const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #d7ecee;
  height: 80px;
`;

export const CompanyLogo = styled(Link)`
  font-weight: bold;
  font-size: 30px;
  color: #001a7a;

  &:hover {
    opacity: 0.5;
    text-decoration: none;
    transition: opacity 0.2s;
  }
`;

export const AuthLink = styled(StyledLink)`
  font-size: 0.9em;
`;

export const AuthLinkWrapper = styled.div`
  display: flex;
`;
