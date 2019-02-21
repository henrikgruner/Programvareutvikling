import React, { Component } from "react";
import { TextBoxField } from "../../components/form";
import { SubmitButton } from "../../components/SubmitButton";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import callApi from "../../utils/callApi";
import styled from "styled-components/macro";

const NumbersWithTitle = ({ label, text }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "auto"
      }}
    >
      <span>
        <i>{label}</i>
      </span>
      <span>{text}</span>
    </div>
  );
};

const Title = ({ label }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        fontWeight: "bold"
      }}
    >
      <h1>{label}</h1>
    </div>
  );
};

/*
const Title = styled.h1`
  margin-bottom: 50px;
  font-weight: bold;
`;
*/

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 50px;
`;

const AuctionForm = ({
  touched,
  error,
  isSubmitting,
  handleSubmit,
  isValid
}) => {
  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <ContentWrapper>
        <img src="url" alt="Bilde" width="150" height="150" />

        <div>
          <Title label="Øreplugger fra Grundig" />

          <ContentWrapper>
            <NumbersWithTitle label="Lederbud" text="18,-" />
            <NumbersWithTitle label="Slutter om" text="15 min 13 sek" />
          </ContentWrapper>

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
          <span>Budøkning: 15</span>
        </div>
      </ContentWrapper>
    </div>
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
