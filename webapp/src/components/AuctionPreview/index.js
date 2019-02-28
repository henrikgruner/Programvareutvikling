import React from "react";
import { Text, AuctionImage, StyledDiv } from "./styles.js";
import { StyledLink } from "../StyledLink";

const AuctionPreview = ({ title, highestBid, id, mainImage }) => {
  return (
    <StyledLink to={`/auctions/${id}`}>
      <StyledDiv>
        {mainImage && <AuctionImage src={mainImage} alt={title} />}
        <Text>{title}</Text>
        <span>Høyeste bud: {highestBid} kr</span>
        Gå til auksjon
      </StyledDiv>
    </StyledLink>
  );
};

export default AuctionPreview;
