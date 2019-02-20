import styled from "styled-components/macro";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--link-color);

  &:hover {
    opacity: 0.5;
    text-decoration: none;
    transition: opacity 0.2s;
  }
`;
