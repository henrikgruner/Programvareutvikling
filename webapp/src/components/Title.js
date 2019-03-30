import styled from "styled-components/macro";

export const Title = styled.h1`
  font-weight: bold;
  text-align: center;
  position: relative;
  font-size: 35px;

  &::after {
    content: "";
    position: absolute;
    top: 45px;
    width: 150px;
    left: 43%;
    background-color: var(--primary-color);
    height: 5px;
  }
`;
