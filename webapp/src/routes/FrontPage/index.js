import React, { Component } from "react";
import AuctionPreview from "../../components/AuctionPreview";
import { Wrapper, ContentWrapper, AuctionListWrapper } from "./styles.js";
import callApi from "../../utils/callApi";
import { SearchField } from "./styles";

class FrontPage extends Component {
  state = {
    auctions: null,
    search: ""
  };

  componentDidMount() {
    callApi("/auctions/", {})
      .then(result => {
        this.setState({ auctions: result.jsonData });
      })
      .catch(err => {
        console.error("Det skjedde en feil når vi hentet data.... ");
        throw err;
      });
  }

  updateSearch(event) {
    this.setState({ search: event.target.value });
  }

  render() {
    return (
      <ContentWrapper>
        <Wrapper>
          <SearchField
            type="text"
            placeholder="Søk etter auksjoner .."
            value={this.state.search}
            onChange={this.updateSearch.bind(this)}
          />
        </Wrapper>
        <AuctionListWrapper>
          {this.state.auctions &&
            this.state.auctions
              .filter(auction => {
                return (
                  auction.title
                    .toLowerCase()
                    .indexOf(this.state.search.toLowerCase()) !== -1
                );
              })
              .map((auction, i) => {
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

export default FrontPage;
