import React, { Component } from "react";
import { connect } from "react-redux";





class ProfilePage extends Component {

  submit = (e) => {

    this.props.history.push("/delete")

  }

  render() {
    return (
      <div>
        <header>
          <h1>Welcome to the profile page</h1>
          
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
