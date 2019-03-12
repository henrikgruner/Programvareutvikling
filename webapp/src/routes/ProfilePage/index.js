import React, { Component } from "react";
import { connect } from "react-redux";
import Info from "../../components/Info"




class ProfilePage extends Component {

  submit = (e) => {

    this.props.history.push("/delete")

  }

  render() {
    return (
      <div>
        <header>
          <h1>Welcome to the profile page</h1>
          <Info></Info>
          <button onClick={this.submit}>Slett bruker</button>
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
