import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import Countdown from "react-countdown-now";
import { Form, Field, withFormik } from "formik";
import callApi from "../../utils/callApi";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";

import { connect } from "react-redux";
import { updateBid } from "../../store/actions/bids";
import { getLeadingBid } from "../../store/actions/bids";
import { getAuction } from "../../store/actions/auction";


import imgPlaceholder from "../../assets/auction_image_placeholder.png";
import { TextBoxField } from "../../components/form";
import { SubmitButton } from "../../components/SubmitButton";
import NumbersWithTitle from "./NumbersWithTitle";
import {
  ContentWrapper,
  DetailWrapper,
  Title,
  AuctionImage,
  InfoWrapper
} from "./styles";

const AuctionForm = ({
  touched,
  error,
  isSubmitting,
  handleSubmit,
  isValid,
  img,
  match
}) => {
  const [initialized, setInitialized] = useState(false);
  const [auction, setAuction] = useState();
  // erstattes med get auction

  useEffect(() => {
    if (!initialized) {
      callApi(`/auctions/${match.params.auctionId}/`, {})
        .then(result => {
          setAuction(result.jsonData);
          console.log("Successful fetch :)", result);
        })
        .catch(err => {
          console.error("Det skjedde en feil når vi hentet data.... ");
          throw err;
        });
      setInitialized(true);
    }
  });

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
            label="Slutter om"
            text={<Countdown date={auction.end_time} />}
            subtextStyles={{
              fontSize: "30px",
              textAlign: "center",
              fontWeight: "bold"
            }}
          />
        </InfoWrapper>
        <div style={{ marginBottom: "2rem", padding: "0 1em" }}>
          Henteaddresse: <b>{auction.pickup_address}</b>
        </div>
        <div style={{ marginBottom: "2rem", padding: "0 1em" }}>
          {auction.description}
        </div>
        <span style={{ fontStyle: "italic", marginLeft: "0.5em" }}>
          Du må øke budet med minst <b>{auction.min_bid_increase} kr</b>
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
      </DetailWrapper>
    </ContentWrapper>
  ) : (
      <div>Loading...</div>
    );
};





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
      auction: `http://127.0.0.1:8000/auctions/${
        window.location.pathname.split("/")[2] // Vil ha auction.url
        }/`
    };

    props.updateBid(payload);
    setSubmitting(false);
  },


  //getLeadingBid

  getBid() {


  },







  // Validation of the form
  validationSchema: props => Yup.object().shape({
    bid: Yup.number()
      .typeError("Skriv inn et bud")
      .required("Skriv inn et bud")
      .positive("Budet må være positivt")
      .integer("Budet må være et heltall")
    //.min(props.auction.min_bid_increase, "Budet må være over budøkningen")
  })
})(AuctionForm);

const mapDispatchToProps = dispatch => {
  return {
    updateBid: payload => dispatch(updateBid(payload))
  };
};

const mapStateToProps = state => {
  return {
    token: state.token,
    auction: state.auction

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuctionPage);
