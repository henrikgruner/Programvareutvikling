import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import Countdown from "react-countdown-now";
import { Form, Field, withFormik } from "formik";
import callApi from "../../utils/callApi";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";

import imgPlaceholder from "../../assets/auction_image_placeholder.png";
import { TextBoxField } from "../../components/form";
import { SubmitButton } from "../../components/SubmitButton";
import NumbersWithTitle from "./NumbersWithTitle";
import { ContentWrapper, Title, AuctionImage, InfoWrapper } from "./styles";

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
      <div>
        <Title>{auction.title}</Title>

        <InfoWrapper>
          <NumbersWithTitle
            label="Lederbud"
            text={`${auction.leading_bid} kr`}
          />
          <NumbersWithTitle
            label="Slutter om"
            text={<Countdown date={auction.end_time} />}
          />
        </InfoWrapper>
        <div>{auction.description}</div>
        <span>Du må øke budet med minst {auction.min_bid_increase} kr</span>
        <div>
          <Form>
            <Field name="bid" component={TextBoxField} />
          </Form>

          <SubmitButton
            onClick={handleSubmit}
            type="submit"
            disabled={isSubmitting}
            valid={isValid}
          >
            Gi bud
          </SubmitButton>
        </div>
      </div>
    </ContentWrapper>
  ) : (
    <div>Loading...</div>
  );
};

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
  handleSubmit(values, { setSubmitting }) {
    var submission = {
      bid: values.bid
    };

    return callApi("/auction", {
      method: "POST",
      body: JSON.stringify(submission)
    })
      .then(() => {
        setSubmitting(false);
      })
      .catch(err => {
        alert("Det skjedde en feil.... ");
        setSubmitting(false);
        throw err;
      });
  },

  // Validation of the form
  validationSchema: Yup.object().shape({
    bid: Yup.number()
      .typeError("Skriv inn et bud")
      .required("Skriv inn et bud")
      .positive("Budet må være positivt")
      .integer("Budet må være et heltall")
      .min(15 + 18, "Budet må være over budøkningen")
  })
})(AuctionForm);

export default AuctionPage;
