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
        <span>Vil du slette brukeren din?</span>
        <StyledLink to="/profile/delete-me/">Trykk her</StyledLink>
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
const mapDispatchToProps = dispatch => {
  return {
    getUserProfile: payload => dispatch(getUserProfile(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePage);
