import styled from "styled-components/macro";

export const StyledDiv = styled.div`
  background-color: #e0e4e5;
  width: 250px;
  min-height: 225px;
  margin: 30px auto;
  box-sizing: border-box;
  border: 1px solid black;
  box-sizing: 30px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-basis: 33.3333%;
`;

export const Text = styled.h1`
  font-weight: bold;
  font-size: 20px;
  color: yellow;
`;

export const AuctionImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: scale-down;
`;
