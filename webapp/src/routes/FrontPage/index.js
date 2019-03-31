import React, { Component } from "react";
import AuctionPreview from "../../components/AuctionPreview";
import { ContentWrapper, AuctionListWrapper } from "./styles.js";
import { SearchField } from "./styles";
import { connect } from "react-redux";
import { getAuctions } from "../../store/actions/auction";
import { Title } from "../../components/Title";
import sortBy from "lodash/sortBy";

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

    const filteredAuctions = this.props.auctions.filter(auction => {
      return (
        auction.is_active &&
        auction.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
          -1
      );
    });

    return (
      <ContentWrapper>
        <SearchField
          type="text"
          placeholder="Søk etter auksjoner .."
          value={this.state.search}
          onChange={this.updateSearch.bind(this)}
        />
        <Title>Aktive auksjoner</Title>

        <AuctionListWrapper>
          {this.props.auctions.length ? (
            filteredAuctions.length ? (
              sortBy(filteredAuctions, ({ end_time }) => end_time).map(
                (auction, i) => {
                  return (
                    <AuctionPreview
                      title={auction.title}
                      mainImage={
                        auction.images.length > 0
                          ? auction.images[0].image
                          : null
                      }
                      highestBid={auction.leading_bid}
                      id={auction.id}
                      endTime={auction.end_time}
                      startBid={auction.start_price}
                      key={i}
                    />
                  );
                }
              )
            ) : (
              <div
                style={{
                  marginTop: "2rem",
                  fontWeight: "bold",
                  fontStyle: "italic"
                }}
              >
                Ingen resultater for dette søket
              </div>
            )
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
