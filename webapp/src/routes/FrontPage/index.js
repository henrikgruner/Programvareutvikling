import React, { Component } from "react";
import AuctionPreview from "../../components/AuctionPreview";
import { ContentWrapper, AuctionList } from "./styles.js";

class FrontPage extends Component {
  render() {
    return (
      <ContentWrapper>
        <AuctionList>
          <AuctionPreview />
          <AuctionPreview />
          <AuctionPreview />
          <AuctionPreview />
          <AuctionPreview />
          <AuctionPreview />
          <AuctionPreview />
          <AuctionPreview />
          <AuctionPreview />
          <AuctionPreview />
          <AuctionPreview />
          <AuctionPreview />
        </AuctionList>
      </ContentWrapper>
    );
  }
}

export default FrontPage;
