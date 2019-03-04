import styled from "styled-components/macro";
import { Link } from "react-router-dom";

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

export const Text = styled.h1`
  font-weight: bold;
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
`;

export const HighestBidText = styled.span`
  font-size: 30px;
  text-align: center;
  color: var(--dark-green);
  font-weight: bold;
  margin-bottom: 20px;
`;

export const AuctionImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 5px 5px 0 0;
`;

export const Wrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  flex-basis: calc(33.3333% - 20px);
  border-radius: 5px;
  min-height: 300px;
  margin: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  color: var(--font-color);

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;
