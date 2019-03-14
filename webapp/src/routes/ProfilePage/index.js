import React, { Component } from "react";
import { connect } from "react-redux";

import { StyledLink } from "../../components/StyledLink";

class ProfilePage extends Component {



  render() {
    return (
      <div>
        <header>
          <h1>Welcome to the profile page</h1>


        </header>
        <StyledLink to={`/userauctions/`}>Mine auksjoner</StyledLink>
      </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  };
};

export default connect(mapStateToProps)(ProfilePage);
