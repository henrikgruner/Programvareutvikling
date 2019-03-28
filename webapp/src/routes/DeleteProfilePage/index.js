import React, { Component } from "react";
import { StyledButton, WrapperDiv } from "./styles";
import { connect } from "react-redux";
import { deleteUser } from "../../store/actions/user";

class DeleteProfilePage extends Component {
  onDelete = () => {
    if (window.confirm("Er du helt sikker?")) {
      this.props.deleteUser(this.props.userId);
    } else {
      this.props.history.push("/profile");
    }
  };

  render() {
    return (
      <div>
        <header>Ønsker du virkelig å slette brukeren din?</header>
        <WrapperDiv>
          <span>
            I tråd med GDPR vil vi anonymisere all informasjon om deg vi
            besitter. Dette inkluderer personlig informasjon, men tidligere
            auksjoner vil fremdeles være synlige.
          </span>

          <StyledButton onClick={this.onDelete}>Slett bruker</StyledButton>
        </WrapperDiv>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.profile && state.user.profile.user.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteUser: payload => dispatch(deleteUser(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteProfilePage);
