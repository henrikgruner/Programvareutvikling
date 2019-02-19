import React from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import callApi from "../../utils/callApi";
import Header from "../../components/Header"
import { StyledLink } from "./styles";
import { EmailField, PasswordField, TextBoxField } from "../../components/form";
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
      <Header></Header>

      <Title>Sign up</Title>

      <Form>
        <Field name="firstname" component={TextBoxField} label="Fornavn" placeholder="Ola" />
        <Field name="lastname" component={TextBoxField} label="Etternavn" placeholder="Nordmann" />
        <Field name="phone" component={TextBoxField} label="Telefonnummer" placeholder="Telefonnummer" ></Field>
        <Field name="email" component={EmailField} label="Email" />
        <Field name="passord" component={PasswordField} />
      </Form>

      <SubmitButton
        onClick={handleSubmit}
        type="submit"
        disabled={isSubmitting}
        valid={isValid}
      >
        Sign up
      </SubmitButton>
      <StyledLink to="/"> Avbryt</StyledLink>
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
      passoord: ""
    };
  },

  // What happens when you submit the form
  handleSubmit(values, { setSubmitting }) {
    var submission = {
      email: values.email,
      passord: values.passord
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

    firstname: Yup.string("Fornavn")
      .required("Fornavn")
      .min(2, "må være lenger enn 2"),

    lastname: Yup.string("Ettenavn")
      .required("Etternavn")
      .min(2, "må være lenger enn 2"),


    email: Yup.string("Email")
      .required("Skriv inn en Email")
      .email("Skriv inn en Email"),

    passord: Yup.string("Passord")
      .required("Passord må være lenger enn fire bokstaver")
      .min(4, "Passord må være lenger enn fire bokstaver"),

    phone: Yup.number("Skriv inn ett telefonnummer")
      .required("Skriv inn ett telefonnummber")



  })
})(SignUpForm);

export default SignUpPage;
