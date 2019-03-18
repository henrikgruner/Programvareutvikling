import React, { Component } from "react";

import AuctionPreview from "../../components/AuctionPreview";
import callApi from "../../utils/callApi";
import { Title, UrlWrapper } from "./styles";

class UsersAuctionsPage extends Component {
  state = {
    myprofile: null
  };

  componentDidMount() {
    callApi("/myprofile/", {})
      .then(result => {
        this.setState({ myprofile: result.jsonData });
      })
      .catch(err => {
        console.error("Det skjedde en feil når vi hentet data.... ");
        throw err;
      });
  }

  render() {
    return (
      <span>
        <Title>Dine auksjoner</Title>

        <h3>Aktive auksjoner</h3>
        <span>
          {this.state.myprofile &&
            this.state.myprofile[0].active_auctions.map(active_auction => {
              return (
                <span>
                  <UrlWrapper to={`/auctions/${active_auction.id}`}>
                    {active_auction.title}
                  </UrlWrapper>
                </span>
              );
            })}
        </span>

        <h3>Inaktive auksjoner</h3>
        <span>
          {this.state.myprofile &&
            this.state.myprofile[0].inactive_auctions.map(inactive_auction => {
              return (
                <span>
                  <UrlWrapper to={`/auctions/${inactive_auction.id}`}>
                    {inactive_auction.title}
                  </UrlWrapper>
                </span>
              );
            })}
        </span>
      </span>
    );
  }
}

export default UsersAuctionsPage;
