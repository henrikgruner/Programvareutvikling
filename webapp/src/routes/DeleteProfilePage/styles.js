import styled from "styled-components";

export const styledDiv = styled.div`
  padding-top: 20px;
  display: flex;
  justify-content: center;
`;

export const WrapperDiv = styled.div`
  display: flex;
  margin: 10px;
  flex-wrap: wrap;
`;

export const StyledButton = styled.button`
  display: inline - block;
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  display: block;
  &: active {
    opacity: 0.9;
  }
  &: hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.2s;
    opacity: 0.9;
  }
`;
