import styled from "styled-components";

export const SubmitButton = styled.button`
  background: ${props => (props.valid ? "darkgreen" : "gray")};
  border: 1px solid ${props => (props.valid ? "lightgreen" : "darkgray")};
  margin: 0 auto 3em auto;
  padding: 1.1em 3em;

  &:active {
    opacity: 0.9;
  }
`;
