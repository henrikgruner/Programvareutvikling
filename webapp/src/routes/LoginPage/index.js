import React from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import callApi from "../../utils/callApi";
import { EmailField, PasswordField } from "../../components/form";
import { Title } from "./styles";
import { SubmitButton } from "../../components/SubmitButton";
import { CancelButton } from "../../components/CancelButton";

const LoginForm = ({
  touched,
  errors,
  isSubmitting,
  handleSubmit,
  isValid
}) => {
  return (
    <div>
      <Title>Logg inn</Title>

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
        Logg inn
      </SubmitButton>
      <CancelButton to="/">Avbryt</CancelButton>
    </div>
  );
};

// Highest order component for login form.
// Handles form values, submit post and form validation.

const LoginPage = withFormik({
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
      .required("Skriv inn en e-mail")
      .email("Skriv inn en e-mail"),

    password: Yup.string()
      .required("Passordet må være lengre enn 4 bokstaver")
      .min(4, "Passordet må være lengre enn 4 bokstaver")
  })
})(LoginForm);

export default LoginPage;
