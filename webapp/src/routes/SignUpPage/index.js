import React from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import callApi from "../../utils/callApi";
import { CancelButton } from "../../components/CancelButton";
import { SubmitButton } from "../../components/SubmitButton";
import {
  EmailField,
  PasswordField,
  TextBoxField,
  TelBoxField
} from "../../components/form";
import { Title } from "./styles";

const SignUpForm = ({
  touched,
  errors,
  isSubmitting,
  handleSubmit,
  isValid
}) => {
  return (
    <div>
      <Title>Lag en ny bruker</Title>

      <Form>
        <Field
          name="firstname"
          component={TextBoxField}
          label="Fornavn"
          placeholder="Ola"
        />
        <Field
          name="lastname"
          component={TextBoxField}
          label="Etternavn"
          placeholder="Nordmann"
        />
        <Field
          name="phonenumber"
          component={TelBoxField}
          label="Telefonnummer"
          placeholder="Telefonnummer"
        />
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

// Highest order component for signup form.
// Handles form values, submit post and form validation.

const SignUpPage = withFormik({
  displayName: "SignUpForm",
  validateOnChange: true,
  enableReinitialize: true,

  mapPropsToValues() {
    return {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      phonenumber: ""
    };
  },

  // What happens when you submit the form
  handleSubmit(values, { setSubmitting }) {
    var submission = {
      email: values.email,
      password: values.password,
      firstname: values.firstname,
      lastname: values.lastname,
      phonenumber: values.phonenumber
    };

    return callApi("/signup", {
      method: "POST",
      body: JSON.stringify(submission)
    })
      .then(() => {
        setSubmitting(false);
      })
      .catch(err => {
        alert("Det skjedde en feil....");
        setSubmitting(false);
        throw err;
      });
  },

  // Validation of the form
  validationSchema: Yup.object().shape({
    firstname: Yup.string("Navnet kan kun inneholde bokstaver")
      .required("Skriv inn ditt fornavn")
      .min(2, "Må være lengre enn 2 bokstaver"),

    lastname: Yup.string("Navnet kan kun inneholde bokstaver")
      .required("Skriv inn ditt etternavn")
      .min(2, "Må være lengre enn 2 bokstaver"),

    phonenumber: Yup.string("Skriv inn ett telefonnummer")
      .matches(
        /^(0047|\+47|47)?\d{8}$/,
        "Skriv inn et gyldig norsk telefonnummer"
      )
      .required("Skriv inn ett telefonnummer"),

    email: Yup.string()
      .required("Skriv inn en e-mail")
      .email("Skriv inn en e-mail"),

    password: Yup.string()
      .required("Passordet må være lengre enn 4 bokstaver")
      .min(4, "Passordet må være lengre enn 4 bokstaver")
  })
})(SignUpForm);

export default SignUpPage;
