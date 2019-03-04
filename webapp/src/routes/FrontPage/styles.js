import styled from "styled-components/macro";

export const ContentWrapper = styled.div`
  overflow: hidden;
  padding-bottom: 60px;
`;

export const AuctionListWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export const Wrapper = styled.div`
  padding-top: 20px;
  display: flex;
  justify-content: center;
`;

export const SearchField = styled.input`
  border: 1px solid rgba(0, 0, 0, 0.09);
  border-bottom: 2px solid var(--primary-color);
  border-radius: 3px;
  color: black;
  display: block;
  margin: 0.3em 0 0.5em 0;
  padding: 0.6em 1em;
  resize: none;
  font-family: Raleway, "Helvetica Neue", Arial, sans-serif;
  font-size: 1rem;
  width: 15em;
  overflow: hidden;
`;
