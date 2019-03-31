import React, { Component } from "react";
import { WrapperDiv, DeleteButton } from "./styles";
import { connect } from "react-redux";
import { deleteUser } from "../../store/actions/user";
import { Title } from "../../components/Title";
import ContentWrapper from "../../components/ContentWrapper";

class DeleteProfilePage extends Component {
  onDelete = () => {
    if (window.confirm("Er du helt sikker?")) {
      this.props.deleteUser(this.props.userId);
    }
  };

  render() {
    return (
      <ContentWrapper>
        <Title>Ønsker du virkelig å slette brukeren din?</Title>
        <WrapperDiv>
          I tråd med GDPR vil vi anonymisere all informasjon om deg vi besitter
          dersom du ønsker det. Dette innebærer at vi sletter all personlig
          informasjon, men at tidligere auksjoner og tidligere bud vil fremdeles
          være synlige, uten at det er knyttet til deg.
          <DeleteButton onClick={this.onDelete}>Slett bruker</DeleteButton>
        </WrapperDiv>
      </ContentWrapper>
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
