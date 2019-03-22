import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { StyledLink } from "../../components/StyledLink";

class ProfilePage extends Component {
  static propTypes = {
    getUserProfile: PropTypes.func.isRequired,
    user: PropTypes.object
  };

  renderUser() {
    const { user } = this.props.user;
    return (
      user && (
        <div>
          <div>Brukernavn: {user.username}</div>
          <div>
            Navn: {user.first_name} {user.last_name}
          </div>
          <div>E-mail : {user.email}</div>
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
          <h1>Welcome to the profile page</h1>
        </header>
        {this.renderUser()}
        <span />
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

export default connect(mapStateToProps)(ProfilePage);
