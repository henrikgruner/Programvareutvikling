import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { StyledLink } from "../../components/StyledLink";
import { getUserProfile } from "../../store/actions/user";
import { format } from "date-fns";
import nb from "date-fns/locale/nb";

class ProfilePage extends Component {
  static propTypes = {
    user: PropTypes.object
  };

  componentDidMount() {
    this.props.getUserProfile();
  }

  renderUser() {
    const user = this.props.user;
    return (
      this.props.user && (
        <div>
          <div>Brukernavn: {user.user.username}</div>
          <div>
            Navn: {user.user.first_name} {user.user.last_name}
          </div>
          <div>E-mail : {user.user.email}</div>
          <div>Telefonnummer : {user.phone_number}</div>
          <div>Adresse : {user.address}</div>
          <hr />
        </div>
      )
    );
  }

  renderBids() {
    if (this.props.user) {
      return this.props.user.bids
        .map((bid, i) => (
          <div>
            {bid.amount} kr på <b>{bid.auction_title}</b> (
            {format(new Date(bid.reg_time), "'kl.' HH:mm:ss d. MMMM yyyy", {
              locale: nb
            })}
            )
            <hr />
          </div>
        ))
        .reverse();
    }
    return null;
  }

  render() {
    return (
      <div>
        <header>
          <h1>Velkommen til din profil</h1>
        </header>
        {this.renderUser()}
        <StyledLink to={`/profile/auctions/`}>Mine auksjoner</StyledLink>
        <div />
        <StyledLink to="/profile/edit-me/">Endre profil</StyledLink>
        <div />
        <StyledLink to="/profile/change-password/">Endre passord</StyledLink>
        <div />
        <StyledLink to="/profile/delete-me/">Slett bruker</StyledLink>
        <h2>Dine bud</h2>
        {this.renderBids()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.profile,
    loading: state.user.loading,
    error: state.user.error
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getUserProfile: payload => dispatch(getUserProfile(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePage);
