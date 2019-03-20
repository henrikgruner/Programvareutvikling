import React, { Component } from "react";
import { connect } from "react-redux";
import { Title, StyledLink } from "./styles";

class UsersAuctionsPage extends Component {
  render() {
    const { profile, error, loading } = this.props;
    return loading ? (
      <span>Loading ...</span>
    ) : error ? (
      <div>Det skjedde en feil</div>
    ) : (
      <div>
        <Title>Dine auksjoner</Title>

        <h3>Dine aktive auksjoner</h3>
        <span>
          {profile &&
            profile.active_auctions.map((active_auction, i) => {
              return (
                <span key={i}>
                  <StyledLink to={`/auctions/${active_auction.id}`}>
                    {active_auction.title}
                  </StyledLink>
                </span>
              );
            })}
        </span>

        <h3>Dine tidligere auksjoner</h3>
        <span>
          {profile &&
            profile.inactive_auctions.map((inactive_auction, i) => {
              return (
                <span key={i}>
                  <StyledLink to={`/auctions/${inactive_auction.id}`}>
                    {inactive_auction.title}
                  </StyledLink>
                </span>
              );
            })}
        </span>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.user.profile,
    loading: state.user.loading,
    error: state.user.error
  };
};

export default connect(mapStateToProps)(UsersAuctionsPage);