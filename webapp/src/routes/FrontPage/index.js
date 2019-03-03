import React, { Component } from "react";
import AuctionPreview from "../../components/AuctionPreview";
import { ContentWrapper, AuctionListWrapper } from "./styles.js";
import callApi from "../../utils/callApi";

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
            this.state.auctions.map((auction, i) => {
              console.log(auction);
              return (
                <AuctionPreview
                  title={auction.title}
                  mainImage={
                    auction.images.length > 0 ? auction.images[0].image : null
                  }
                  highestBid={auction.leading_bid}
                  id={auction.id}
                  key={i}
                />
              );
            })}
        </AuctionListWrapper>
      </ContentWrapper>
    );
  }
}


export default(FrontPage);
