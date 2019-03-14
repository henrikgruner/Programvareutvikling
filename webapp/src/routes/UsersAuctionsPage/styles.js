import styled from "styled-components/macro";
import { Link } from "react-router-dom";

export const Title = styled.h1`
  font-weight: bold;
`;

export const UrlWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 5px;
  margin: 10px;
  transition: 0.3s;
  color: var(--font-color);

  &:hover {
    opacity: 0.5;
    text-decoration: none;
    transition: opacity 0.2s;
  }
`;
