import React, { Component } from "react";
import { StyledDiv } from "./styles.js";
import { Text } from "./styles.js";
import { StyledLink } from "../StyledLink";

class AuctionPreview extends Component {
  render() {
    return (
      <StyledDiv>
        <Text>{this.props.title}</Text>
        <span>Høyeste bud: ... kr</span>
        <StyledLink to={`/auctions/${this.props.id}`}>Legg inn bud</StyledLink>
      </StyledDiv>
    );
  }
}

export default AuctionPreview;
