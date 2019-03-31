import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserProfile } from "../../store/actions/user";
import { format } from "date-fns";
import nb from "date-fns/locale/nb";
import { Title } from "../../components/Title";
import {
  ContentWrapper,
  Grid,
  Link,
  Sidebar,
  CurrentAuctions,
  ProfileInfo,
  PreviousAuctions,
  SectionTitle,
  Bids,
  AuctionsWon,
  NoContent,
  Profile,
  Label
} from "./styles";

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
        <Profile>
          <Label>Brukernavn</Label>
          <span>{user.user.username}</span>
          <Label>Navn</Label>
          <span>
            {user.user.first_name} {user.user.last_name}
          </span>
          <Label>E-mail</Label>
          <span>{user.user.email}</span>
          <Label>Telefonnummer</Label>
          <span>{user.phone_number}</span>
          <Label>Adresse</Label>
          <span>{user.address}</span>
        </Profile>
      )
    );
  }

  renderBids() {
    if (this.props.user) {
      return this.props.user.bids && this.props.user.bids.length ? (
        this.props.user.bids
          .map((bid, i) => (
            <div>
              {bid.amount} kr på <b>{bid.auction_title}</b> (
              {format(new Date(bid.reg_time), "'kl.' HH:mm:ss d. MMMM yyyy", {
                locale: nb
              })}
              )
              <hr />
            </div>
          ))
          .reverse()
      ) : (
        <NoContent>
          Du har ikke bydd på noe
          <Link to="/">Se alle auksjoner</Link>
        </NoContent>
      );
    }
    return null;
  }

  render() {
    const user = this.props.user;

    return (
      <ContentWrapper>
        <Title>Min Side</Title>
        <Grid>
          <Sidebar>
            <SectionTitle>Meny</SectionTitle>
            <Link to="/profile/edit-me/">Endre profil</Link>
            <Link to="/profile/change-password/">Endre passord</Link>
            <Link to="/profile/delete-me/">Slett bruker</Link>
          </Sidebar>

          <ProfileInfo>
            <SectionTitle>Din profil</SectionTitle>
            {this.renderUser()}
          </ProfileInfo>

          <Bids>
            <SectionTitle>Dine bud</SectionTitle>
            {this.renderBids()}
          </Bids>

          <CurrentAuctions>
            <SectionTitle>Dine auksjoner</SectionTitle>
            {user && user.active_auctions.length ? (
              user.active_auctions.map((active_auction, i) => {
                return (
                  <span key={i}>
                    <Link to={`/auctions/${active_auction.id}`}>
                      {active_auction.title}
                    </Link>
                    <hr />
                  </span>
                );
              })
            ) : (
              <NoContent>
                Du har ingen aktive auksjoner
                <Link to="/profile/edit-me/">Lag en ny auksjon</Link>
              </NoContent>
            )}
          </CurrentAuctions>

          <AuctionsWon>
            <SectionTitle>Vunnede auksjoner</SectionTitle>
            <span>
              {user && user.won_auctions.length ? (
                user.won_auctions.map((inactive_auction, i) => {
                  return (
                    <span key={i}>
                      <Link to={`/auctions/${inactive_auction.id}`}>
                        {inactive_auction.title}
                      </Link>
                    </span>
                  );
                })
              ) : (
                <NoContent>
                  Du har ikke vunnet noen auksjoner
                  <Link to="/">Se alle auksjoner</Link>
                </NoContent>
              )}
            </span>
          </AuctionsWon>

          <PreviousAuctions>
            <SectionTitle>Tidligere auksjoner</SectionTitle>
            <span>
              {user && user.inactive_auctions.length ? (
                user.inactive_auctions.map((inactive_auction, i) => {
                  return (
                    <span key={i}>
                      <Link to={`/auctions/${inactive_auction.id}`}>
                        {inactive_auction.title}
                      </Link>
                    </span>
                  );
                })
              ) : (
                <NoContent>Du har ingen tidligere auksjoner</NoContent>
              )}
            </span>
          </PreviousAuctions>
        </Grid>
      </ContentWrapper>
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
