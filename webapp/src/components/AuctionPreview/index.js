import React from "react";
import {
  Text,
  AuctionImage,
  Wrapper,
  InfoWrapper,
  HighestBidText
} from "./styles";
import { SubmitButton } from "../../components/SubmitButton";

const AuctionPreview = ({ title, highestBid, id, mainImage }) => {
  return (
    <Wrapper to={`/auctions/${id}`}>
      {mainImage && <AuctionImage src={mainImage} alt={title} />}

      <InfoWrapper>
        <Text>{title}</Text>
        <HighestBidText>{highestBid} kr</HighestBidText>
        <SubmitButton as="span" type="submit" valid={true}>
          Gi Bud
        </SubmitButton>
      </InfoWrapper>
    </Wrapper>
  );
};

export default AuctionPreview;
