import React from "react";
import {
  Text,
  AuctionImage,
  Wrapper,
  InfoWrapper,
  HighestBidText,
  CountdownWrapper,
  StartBidText
} from "./styles";
import { SubmitButton } from "../../components/SubmitButton";
import Countdown from "react-countdown-now";

const AuctionPreview = ({
  title,
  highestBid,
  id,
  mainImage,
  endTime,
  startBid
}) => {
  return (
    <Wrapper to={`/auctions/${id}`}>
      <CountdownWrapper>
        <Countdown date={endTime} />
      </CountdownWrapper>
      {mainImage && <AuctionImage src={mainImage} alt={title} />}

      <InfoWrapper>
        <StartBidText>Startpris: {startBid} kr</StartBidText>
        <HighestBidText>{highestBid} kr</HighestBidText>
        <Text>{title}</Text>
        <SubmitButton as="span" type="submit" valid={true}>
          Gi bud
        </SubmitButton>
      </InfoWrapper>
    </Wrapper>
  );
};

export default AuctionPreview;
