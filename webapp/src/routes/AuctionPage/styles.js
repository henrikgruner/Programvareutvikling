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

export const Wrapper = styled.div`
  overflow: hidden;
  padding-bottom: 60px;
  display: flex;
  justify-content: center;
`;
export const BidHistoryButton = styled.button`
  background: #6dcc18
  border: 0px solid ${props =>
    props.valid ? "var(--dark-green)" : "darkgray"};
  padding: ${props => props.padding};
  border-radius: 30px;
  width: ${props => props.width};
  height: ${props => props.height};
  color: white;
  text-align: center;
  font-size: 1rem;
  &:active {
  opacity: 0.9;
  }
  &:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.2s;
  opacity: 0.9;
  }
`;
export const Modal = styled.div`
  display: none;
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: white
  background-color: rgba(0,0,0,0.4);
`;
export const ModalWrapper = styled.div`
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 25%;
  height: 50%
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  overflow-y: auto;
`;
