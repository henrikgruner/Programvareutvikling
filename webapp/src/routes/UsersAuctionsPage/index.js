import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserProfile } from "../../store/actions/user";
import { Title, StyledLink } from "./styles";

class UsersAuctionsPage extends Component {
  componentDidMount() {
    this.props.getUserProfile();
  }

  render() {
    const { myprofile, error, loading } = this.props;

    return (
      <span>
        <Title>Dine auksjoner</Title>

        <h3>Aktive auksjoner</h3>
        <span>
          {myprofile &&
            myprofile[0].active_auctions.map(active_auction => {
              return (
                <span>
                  <StyledLink to={`/auctions/${active_auction.id}`}>
                    {active_auction.title}
                  </StyledLink>
                </span>
              );
            })}
        </span>

        <h3>Inaktive auksjoner</h3>
        <span>
          {myprofile &&
            myprofile[0].inactive_auctions.map(inactive_auction => {
              return (
                <span>
                  <StyledLink to={`/auctions/${inactive_auction.id}`}>
                    {inactive_auction.title}
                  </StyledLink>
                </span>
              );
            })}
        </span>
      </span>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserProfile: payload => dispatch(getUserProfile(payload))
  };
};

const mapStateToProps = state => {
  return {
    myprofile: state.user.myprofile,
    loading: state.user.loading,
    error:
      state.user.error && state.user.error.response.jsonData.non_field_errors[0]
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersAuctionsPage);
