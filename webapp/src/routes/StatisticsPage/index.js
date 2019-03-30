import React, { Component } from "react";
import { connect } from "react-redux";
import { getAuctions } from "../../store/actions/auction";
import { getAllUsers } from "../../store/actions/user";
import { Title } from "../../components/Title";
import ContentWrapper from "../../components/ContentWrapper";

class StatisticsPage extends Component {
  state = {
    search: ""
  };

  componentDidMount() {
    this.props.getAuctions();
    this.props.getAllUsers();
  }

  updateSearch(event) {
    this.setState({ search: event.target.value });
  }

  render() {
    if (this.props.loading) {
      return <span>Loading ...</span>;
    }

    if (this.props.error) {
      return (
        <span>
          Det skjedde en feil når vi hentet siden. Prøv igjen senere ...
        </span>
      );
    }

    const filteredAuctions = this.props.auctions.filter(auction => {
      return auction.is_active;
    });

    const filteredUsers =
      this.props.users &&
      this.props.users.filter(user => {
        return user.is_active;
      });

    return (
      <ContentWrapper>
        <Title>Statistikk</Title>
        <div>
          Aktive auksjoner {filteredAuctions && filteredAuctions.length}{" "}
        </div>
        <div>Aktive brukere {filteredUsers && filteredUsers.length}</div>
      </ContentWrapper>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAuctions: payload => dispatch(getAuctions(payload)),
    getAllUsers: payload => dispatch(getAllUsers(payload))
  };
};

const mapStateToProps = state => {
  return {
    auctions: state.auction.auctions,
    loading: state.auction.loading,
    error: state.auction.error,
    users: state.user.users
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatisticsPage);
