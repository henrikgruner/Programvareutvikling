import styled from "styled-components/macro";
import PageWrapper from "../../components/ContentWrapper";
import { StyledLink } from "../../components/StyledLink";

export const ContentWrapper = styled(PageWrapper)`
  overflow: hidden;
  padding-bottom: 60px;
`;

export const Grid = styled.div`
  padding: 1rem;
  margin: auto;
  display: grid;
  grid-template-columns: 150px 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "sidebar profileinfo profileinfo auctionswon"
    "sidebar bids myauctions previousauctions";
  grid-column-gap: 1rem;
  grid-row-gap: 1.3rem;
  box-sizing: border-box;
`;

const Card = styled.div`
  border-radius: 5px;
  padding: 1.5rem;
  box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.2);
`;

export const Sidebar = styled.div`
  border-right: 1px solid lightgray;
  grid-area: sidebar;
  padding-right: 2rem;
`;

export const ProfileInfo = styled(Card)`
  grid-area: profileinfo;
  border-radius: 10px;
`;

export const PreviousAuctions = styled(Card)`
  grid-area: previousauctions;
`;

export const CurrentAuctions = styled(Card)`
  grid-area: myauctions;
`;

export const Bids = styled(Card)`
  grid-area: bids;
`;

export const AuctionsWon = styled(Card)`
  grid-area: auctionswon;
`;

export const Link = styled(StyledLink)`
  display: block;
  margin: 0.5rem 0;
`;

export const SectionTitle = styled.h2`
  font-weight: bold;
  margin-top: 0;
  position: relative;
  font-size: 17px;
  text-transform: uppercase;
  letter-spacing: 1px;

  &::after {
    content: "";
    position: absolute;
    top: 23px;
    left: 0;
    width: 100%;
    background-color: var(--primary-color);
    height: 2px;
  }
`;

export const NoContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 2.5rem;
`;

export const Profile = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-row-gap: 10px;
`;

export const Label = styled.div`
  font-weight: bold;
  font-style: italic;
`;
