import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { StyledLink } from "../../components/StyledLink";
import { getUserProfile } from "../../store/actions/user";

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
          <StyledLink to={`/profile/auctions/`}>Mine auksjoner</StyledLink>
        </div>
      )
    );
  }

  render() {
    return (
      <div>
        <header>
          <h1>Velkommen til din profil</h1>
        </header>
        {this.renderUser()}
        <div>
          Vil du slette brukeren din?
          <StyledLink to="/profile/delete-me/"> Trykk her</StyledLink>
        </div>
        <span>Vil du endre brukeren din?</span>
        <StyledLink to="/profile/edit-me/"> Endre profil her</StyledLink>
        <span />
        <span>Vil du endre passord?</span>
        <StyledLink to="/profile/change-password/">Trykk her</StyledLink>
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
