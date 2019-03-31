import styled from "styled-components/macro";
import { Link } from "react-router-dom";

export const Wrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  flex-basis: calc(33.3333% - 20px);
  max-width: 270px;
  border-radius: 5px;
  min-height: 400px;
  margin: 10px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  color: var(--font-color);
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;

export const InfoWrapper = styled.div`
  padding: 2px 20px 30px 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
`;

export const CountdownWrapper = styled.div`
  height: 40px;
  min-height: 40px;
  font-family: "Open Sans", sans-serif;
  background-color: #e4e4e4;
  width: 100%;
  display: flex;
  color: rgba(0, 0, 0, 0.55);
  justify-content: center;
  align-items: center;
  font-size: 23px;
`;

export const Text = styled.h1`
  font-size: 18px;
  text-align: center;
  margin-bottom: 20px;
  width: 100%;
  word-wrap: break-word;
`;

export const HighestBidText = styled.div`
  font-size: 30px;
  text-align: center;
  color: var(--dark-green);
  font-weight: bold;
  font-family: "Open Sans", sans-serif;
`;

export const StartBidText = styled.div`
  font-size: 15px;
  text-align: center;
  color: rgba(0, 0, 0, 0.55);
  margin-bottom: 5px;
  font-family: "Open Sans", sans-serif;
`;

export const AuctionImage = styled.img`
  height: 250px;
  object-fit: cover;
  width: 100%;
  padding: 1rem;
  padding-bottom: 0.3rem;
  border-radius: 30px;
`;
