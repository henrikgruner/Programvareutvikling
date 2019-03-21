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
  ${media.tablet`
    width: 100%;
  `};
`;

export const AuctionImage = styled.img`
  width: 300px;
  height: auto;
  object-fit: scale-down;

  ${media.tablet`
    width: auto;
    height: 400px;
    margin: 0 auto;
  `};
`;

export const Title = styled.h1`
  padding: 20px 0;
  font-weight: bold;
  text-align: center;
`;

export const DetailWrapper = styled.div`
  margin-left: 60px;

  ${media.tablet`
    margin-left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  `};
`;

export const AuthRequirementText = styled.div`
  font-weight: bold;
  color: var(--primary-color);
  text-align: center;
`;

export const BidWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
