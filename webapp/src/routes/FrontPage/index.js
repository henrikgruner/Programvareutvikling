import React, { Component } from "react";
import AuctionPreview from "../../components/AuctionPreview";
import { Wrapper, ContentWrapper, AuctionListWrapper } from "./styles.js";
import { SearchField } from "./styles";
import { connect } from "react-redux";
import { getAuctions } from "../../store/actions/auction";

class FrontPage extends Component {
  state = {
    search: ""
  };

  componentDidMount() {
    this.props.getAuctions();
  }

  updateSearch(event) {
    this.setState({ search: event.target.value });
  }

  render() {
    if (this.props.loading) {
      return <span>Loading ...</span>;
    }

    if (this.props.error) {
      return (
        <span>
          Det skjedde en feil når vi hentet siden. Prøv igjen senere ...
        </span>
      );
    }

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
          {this.props.auctions.length ? (
            this.props.auctions
              .filter(auction => {
                return (
                  auction.is_active &&
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
              })
          ) : (
            <div
              style={{
                marginTop: "2rem",
                fontWeight: "bold",
                fontStyle: "italic"
              }}
            >
              Det er ingen aktive auksjoner akkurat nå
            </div>
          )}
        </AuctionListWrapper>
      </ContentWrapper>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAuctions: payload => dispatch(getAuctions(payload))
  };
};

const mapStateToProps = state => {
  return {
    auctions: state.auction.auctions,
    loading: state.auction.loading,
    error: state.auction.error
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FrontPage);
