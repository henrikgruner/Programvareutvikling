import styled from "styled-components/macro";

export const SubmitButton = styled.button.attrs(
  ({ width, height, padding, fontSize }) => ({
    width: width || "auto",
    height: height || "auto",
    padding: padding || "1.1em 3em",
    fontSize: fontSize || "1.1em"
  })
)`
  background: ${props => (props.valid ? "var(--light-green)" : "gray")};
  border: 0px solid ${props => (props.valid ? "var(--dark-green)" : "darkgray")};
  padding: ${props => props.padding};
  border-radius: 30px;
  width: ${props => props.width};
  height: ${props => props.height};
  color: white;
  text-align: center;
  font-weight: bold;
  font-size: 1.1rem;

  &:active {
    opacity: 0.9;
  }

  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.2s;
    opacity: 0.9;
  }
`;
