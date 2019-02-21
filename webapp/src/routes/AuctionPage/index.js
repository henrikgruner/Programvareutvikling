import React from "react";
import * as Yup from "yup";
import callApi from "../../utils/callApi";
import { Form, Field, withFormik } from "formik";

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
  img
}) => {
  const imageSrc = img ? img : imgPlaceholder;

  return (
    <ContentWrapper>
      <AuctionImage src={imageSrc} alt="Bilde" />

      <div>
        <Title>Øreplugger fra Grundig</Title>

        <InfoWrapper>
          <NumbersWithTitle label="Lederbud" text="18,-" />
          <NumbersWithTitle label="Slutter om" text="15 min 13 sek" />
        </InfoWrapper>

        <span>Minste budøkning: 15</span>
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
