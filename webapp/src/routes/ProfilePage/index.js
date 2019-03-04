import React, { Component } from "react";

import { connect } from "react-redux";

class ProfilePage extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>Velkommen til din profil</h1>
        </header>
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
