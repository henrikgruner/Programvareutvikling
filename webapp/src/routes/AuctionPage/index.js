import React, { useState, useEffect, Component } from "react";
import * as Yup from "yup";
import Countdown from "react-countdown-now";
import { Form, Field, withFormik } from "formik";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";

import { connect } from "react-redux";
import { createBid, getAuction } from "../../store/actions/auction";
import { StyledLink } from "../../components/StyledLink";

import imgPlaceholder from "../../assets/auction_image_placeholder.png";
import { TextBoxField } from "../../components/form";
import { SubmitButton } from "../../components/SubmitButton";
import { CancelButton } from "../../components/CancelButton";
import NumbersWithTitle from "./NumbersWithTitle";
import {
  ContentWrapper,
  DetailWrapper,
  Title,
  AuctionImage,
  InfoWrapper,
  BidWrapper,
  AuthRequirementText,
  Wrapper,
  BidHistoryButton,
  Modal,
  ModalWrapper
} from "./styles";

const AuctionForm = ({
  touched,
  error,
  isSubmitting,
  handleSubmit,
  isValid,
  img,
  match,
  auction,
  getAuction,
  authenticated,
  loading,
  user
}) => {
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    if (!initialized) {
      getAuction(match.params.auctionId);
      document.cookie = `id=${match.params.auctionId}`;
      setInitialized(true);
    }
  });

  if (loading) {
    return <span>Loading ...</span>;
  }

  const isAuthor = auction && auction.author === user;

  if (error) {
    return (
      <span>
        Det skjedde en feil når vi hentet siden. Prøv igjen senere ...
      </span>
    );
  }

  return auction ? (
    <ContentWrapper>
      {auction.images.length > 0 ? (
        <ImageGallery
          showIndex={true}
          slideDuration={450}
          showPlayButton={false}
          items={auction.images.map(image => ({
            original: image.image,
            thumbnail: image.image
          }))}
        />
      ) : (
        <AuctionImage src={imgPlaceholder} alt="Placeholder" />
      )}
      <DetailWrapper>
        <Title>{auction.title}</Title>
        <InfoWrapper>
          <NumbersWithTitle
            label="Lederbud"
            text={`${auction.leading_bid} kr`}
            subtextStyles={{
              fontSize: "30px",
              textAlign: "center",
              color: "var(--dark-green)",
              fontWeight: "bold"
            }}
          />
          <NumbersWithTitle
            label={auction.is_active ? "Slutter om" : "Denne auksjonen er"}
            text={
              auction.is_active ? (
                <Countdown date={auction.end_time} />
              ) : (
                "Avsluttet"
              )
            }
            subtextStyles={{
              fontSize: "30px",
              textAlign: "center",
              fontWeight: "bold"
            }}
          />
        </InfoWrapper>
        {auction.winner && (
          <span>
            Vinneren er {auction.winner.first_name} {auction.winner.last_name}
          </span>
        )}
        <div style={{ marginBottom: "2rem" }}>
          Henteaddresse: <b>{auction.pickup_address}</b>
        </div>
        <div style={{ marginBottom: "2rem" }}>
          {" "}
          Beskrivelse: {auction.description}
        </div>
        {authenticated ? (
          !isAuthor ? (
            <BidWrapper>
              <span style={{ fontStyle: "italic" }}>
                Du må øke lederbudet med minst{" "}
                <b>{auction.min_bid_increase} kr</b>
              </span>
              <div style={{ margin: "1rem auto" }}>
                <Form>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Field
                      name="bid"
                      component={TextBoxField}
                      placeholder="Skriv inn ditt bud .."
                    />
                    <span style={{ marginRight: "20px" }} />
                    <SubmitButton
                      onClick={handleSubmit}
                      type="submit"
                      disabled={isSubmitting}
                      valid={isValid}
                      fontSize="1rem"
                      padding="0 2em"
                      height="50px"
                    >
                      Gi bud
                    </SubmitButton>
                  </div>
                </Form>
              </div>
            </BidWrapper>
          ) : (
            <>
              Hvis nåværende lederbud vinner vil vi trekke et gebyr på{" "}
              <b>{auction.leading_bid * 0.05} kr</b> for auksjonen.
            </>
          )
        ) : (
          <AuthRequirementText>
            <StyledLink to="/login">
              Du må logge inn for å by - Logg inn
            </StyledLink>
          </AuthRequirementText>
        )}
        <BidList
          leadingBid={auction.leading_bid}
          bidlist={
            auction &&
            auction.bids.reverse().map((bid, i) => {
              const author = bid.author === user;
              return (
                <div>
                  {!author ? (
                    <span key={i}>
                      {"Bruker: #" +
                        `${bid.author}`.split("/")[4] +
                        " Sum: " +
                        bid.amount +
                        ",-"}
                      <hr />
                    </span>
                  ) : (
                    <span style={{ fontWeight: "bold" }} key={i}>
                      {"Ditt bud: " + bid.amount + ",-"}
                      <hr />
                    </span>
                  )}
                </div>
              );
            })
          }
        />
      </DetailWrapper>
      <CancelButton to="/report">Rapportér</CancelButton>
    </ContentWrapper>
  ) : (
    <div>Loading...</div>
  );
};

class BidList extends Component {
  buttonClick() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
  }
  spanClick() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }
  render() {
    window.onclick = function(event) {
      var modal = document.getElementById("myModal");
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };
    return (
      <Wrapper>
        <BidHistoryButton onClick={this.buttonClick}>
          Se Budhistorikk
        </BidHistoryButton>
        <Modal id="myModal">
          <ModalWrapper>
            <span style={{ fontWeight: "bold" }}>{`Lederbud: ${
              this.props.leadingBid
            }`}</span>
            <hr />
            <span>{this.props.bidlist}</span>
          </ModalWrapper>
        </Modal>
      </Wrapper>
    );
  }
}

//Kode for å gi bud
const AuctionPage = withFormik({
  displayName: "AuctionForm",
  validateOnChange: true,
  enableReinitialize: true,

  mapPropsToValues() {
    return {
      bid: ""
    };
  },

  // What happens when you submit the form
  handleSubmit(values, { setSubmitting, props }) {
    var payload = {
      amount: values.bid,
      auction: `http://127.0.0.1:8000/auctions/${props.auction.id}/`
    };

    props.createBid(payload);
    setSubmitting(false);
  },

  // Validation of the form
  validationSchema: ({ auction: { min_bid_increase, leading_bid } }) =>
    Yup.object().shape({
      bid: Yup.number()
        .typeError("Skriv inn et bud")
        .required("Skriv inn et bud")
        .positive("Budet må være positivt")
        .integer("Budet må være et heltall")
        .min(leading_bid + min_bid_increase, "Budet må være over budøkningen")
    })
})(AuctionForm);

const mapDispatchToProps = dispatch => {
  return {
    createBid: payload => dispatch(createBid(payload)),
    getAuction: payload => dispatch(getAuction(payload))
  };
};

const mapStateToProps = state => {
  return {
    auction: state.auction.auction,
    authenticated: state.auth.authenticated,
    loading: state.auction.loading,
    error: state.auction.error,
    user: state.user.profile && state.user.profile.user.url
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuctionPage);
