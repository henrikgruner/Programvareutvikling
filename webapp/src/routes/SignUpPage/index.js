import React from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import callApi from "../../utils/callApi";

import { EmailField, PasswordField } from "../../components/form";
import { Title } from "./styles";
import { SubmitButton } from "../../components/SubmitButton";

const SignUpForm = ({
  touched,
  errors,
  isSubmitting,
  handleSubmit,
  isValid
}) => {
  return (
    <div>
      <Title>Sign up</Title>

      <Form>
        <Field name="email" component={EmailField} />
        <Field name="password" component={PasswordField} />
      </Form>

      <SubmitButton
        onClick={handleSubmit}
        type="submit"
        disabled={isSubmitting}
        valid={isValid}
      >
        Sign up
      </SubmitButton>
    </div>
  );
};

// Highest order component for login form.
// Handles form values, submit post and form validation.

const SignUpPage = withFormik({
  displayName: "SignUpForm",
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

    return callApi("/signup", {
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
})(SignUpForm);

export default SignUpPage;