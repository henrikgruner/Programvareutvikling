import styled from "styled-components";
import { media } from "../../utils/mediaQueries";

export const ContentWrapper = styled.div`
  display: flex;
  padding: 50px;

  ${media.tablet`
    flex-wrap: wrap;
  `};
`;

export const InfoWrapper = styled.div`
  display: flex;
  padding: 40px;
  padding-top: 0;
`;

export const AuctionImage = styled.img`
  width: 300px;
  height: auto;
  object-fit: scale-down;
`;

export const Title = styled.h1`
  padding: 20px 0;
  font-weight: bold;
`;
