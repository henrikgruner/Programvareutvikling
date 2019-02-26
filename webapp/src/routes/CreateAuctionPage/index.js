import React from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import callApi from "../../utils/callApi";

import {
  PasswordField,
  TextAreaField,
  TextBoxField
} from "../../components/form";
import { Title } from "./styles";
import { SubmitButton } from "../../components/SubmitButton";
import FileUpload from "../../components/form/FileUpload";
import { CancelButton } from "../../components/CancelButton";

const CreateAuctionForm = ({
  touched,
  errors,
  isSubmitting,
  handleSubmit,
  isValid
}) => {
  return (
    <div>
      <Title>Legg ut gjenstand for auksjon</Title>

      <Form>
        <Field
          name="text"
          component={TextBoxField}
          label="Tittel"
          placeholder="Skriv inn tittel.."
        />
        <Field
          name="descripiton"
          component={TextAreaField}
          label="Beskrivelse"
          placeholder="Skriv inn en beskrive av produktet.."
        />
      </Form>

      <SubmitButton
        onClick={handleSubmit}
        type="submit"
        disabled={isSubmitting}
        valid={isValid}
      >
        Last opp
      </SubmitButton>
      <CancelButton to="/">Avbryt</CancelButton>
    </div>
  );
};

// Highest order component for login form.
// Handles form values, submit post and form validation.

const CreateAuctionPage = withFormik({
  displayName: "LoginForm",
  validateOnChange: true,
  enableReinitialize: true,

  mapPropsToValues() {
    return {
      email: "",
      password: ""
    };
  },

  // What happens when you submit the form
  handleSubmit(values, { setSubmitting }) {
    var submission = {
      email: values.email,
      password: values.password
    };

    return callApi("/login", {
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
    email: Yup.string()
      .required("Please enter an email")
      .email("Well, that's not an email"),

    password: Yup.string()
      .required("Enter a password")
      .min(4, "Password should be longer than 4 characters")
  })
})(CreateAuctionForm);

export default CreateAuctionPage;
