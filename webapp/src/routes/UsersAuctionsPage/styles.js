import styled from "styled-components/macro";
import { StyledLink as Link } from "../../components/StyledLink";

export const Title = styled.h1`
  font-weight: bold;
`;

export const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 5px;
  margin: 10px;
  transition: 0.3s;
  color: var(--font-color);
`;
