import React, { Component } from "react";
import { Route } from "react-router-dom";
import AuctionPreview from "../../components/AuctionPreview";
import { ContentWrapper, AuctionListWrapper } from "./styles.js";
import callApi from "../../utils/callApi";

import AuctionPage from "../AuctionPage";

class FrontPage extends Component {
  state = {
    auctions: null
  };

  componentDidMount() {
    callApi("/auctions/", {})
      .then(result => {
        this.setState({ auctions: result.jsonData });
        console.log("Successful fetch :)", result);
      })
      .catch(err => {
        console.error("Det skjedde en feil når vi hentet data.... ");
        throw err;
      });
  }

  render() {
    return (
      <ContentWrapper>
        <AuctionListWrapper>
          {this.state.auctions &&
            this.state.auctions.map((auction, i) => (
              <AuctionPreview title={auction.title} id={auction.id} key={i} />
            ))}
        </AuctionListWrapper>
      </ContentWrapper>
    );
  }
}

export default FrontPage;
