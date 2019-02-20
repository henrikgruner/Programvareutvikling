import React, { Component } from "react";
import { StyledDiv } from "./styles.js";
import { Text } from "./styles.js";
import { StyledLink } from "../StyledLink";

class AuctionPreview extends Component {
  render() {
    return (
      <StyledDiv>
        <Text>Auksjonstittel</Text>
        <StyledLink to="/auction">Legg inn bud</StyledLink>
      </StyledDiv>
    );
  }
}
export default AuctionPreview;
