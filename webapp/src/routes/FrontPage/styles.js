import styled from "styled-components/macro";
import PageWrapper from "../../components/ContentWrapper";

export const ContentWrapper = styled(PageWrapper)`
  overflow: hidden;
  padding-bottom: 60px;
`;

export const AuctionListWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export const SearchField = styled.input`
  border: 1px solid rgba(0, 0, 0, 0.09);
  border-bottom: 2px solid var(--primary-color);
  border-top: 1px solid lightgray;
  border-radius: 15px;
  color: black;
  display: block;
  margin: 0.3em 0 0.5em 0;
  padding: 0.6em 1em;
  resize: none;
  font-family: Raleway, "Helvetica Neue", Arial, sans-serif;
  font-size: 1rem;
  width: 35em;
  overflow: hidden;
  margin: 20px auto;

  &:focus {
    outline: none;
  }
`;
