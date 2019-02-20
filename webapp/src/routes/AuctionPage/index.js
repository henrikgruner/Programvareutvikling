import React, { Component } from "react";
import { TextBoxField } from "../../components/form";
import { SubmitButton } from "../../components/SubmitButton";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import callApi from "../../utils/callApi";

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
      <span>{label}</span>
      <span>{text}</span>
    </div>
  );
};

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
      <div style={{ marginBottom: "50px" }}>
        <span style={{ fontSize: "2em" }}>Øreplugger fra Grundig</span>
      </div>

      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ marginRight: "20px" }}>
          <img src="url" alt="Bilde" />
        </div>

        <div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <NumbersWithTitle label="Lederbud" text="110,-" />
            <NumbersWithTitle label="Slutter om" text="15 min 13 sek" />
          </div>
          <div style={{ marginTop: "50px" }}>
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
          <div style={{ marginTop: "10px" }}>
            <span>Budøkning: 15</span>
          </div>
        </div>
      </div>
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
      .min(15 + 110, "Budet må være over budøkningen")
  })
})(AuctionForm);

export default AuctionPage;
