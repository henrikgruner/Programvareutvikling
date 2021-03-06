import React from "react";
import { Field, withFormik } from "formik";
import * as Yup from "yup";
import { CancelButton } from "../../components/CancelButton";
import { SubmitButton } from "../../components/SubmitButton";
import {
  EmailField,
  PasswordField,
  TextBoxField,
  TelBoxField,
  TextAreaField
} from "../../components/form";
import { signupUser } from "../../store/actions/auth";
import { connect } from "react-redux";
// eslint-disable-next-line no-unused-vars
import { equalTo } from "../../utils/validation";
import { Redirect } from "react-router-dom";
import { Title } from "../../components/Title";
import { ContentWrapper, Form } from "./styles";

const SignUpForm = ({
  touched,
  errors,
  isSubmitting,
  handleSubmit,
  isValid,
  loading,
  error,
  authenticated
}) => {
  if (loading) {
    return <span>Loading ...</span>;
  }

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <ContentWrapper>
      <Title>Lag en ny bruker</Title>
      {error && (
        <div style={{ textAlign: "center", color: "var(--warning-red)" }}>
          Kunne ikke opprette brukeren akkurat nå. <br />
          Vennligst prøv igjen senere.
        </div>
      )}

      <Form>
        <Field
          name="firstName"
          component={TextBoxField}
          label="Fornavn"
          placeholder="Ola Bernad"
        />
        <Field
          name="lastName"
          component={TextBoxField}
          label="Etternavn"
          placeholder="Nordmann"
        />
        <Field
          name="username"
          component={TextBoxField}
          placeholder="Brukernavn.."
          label="Brukernavn"
        />
        <Field name="email" component={EmailField} />
        <Field name="password" component={PasswordField} />
        <Field
          name="passwordConfirm"
          component={PasswordField}
          label="Gjenta passordet"
        />
        <Field
          name="phoneNumber"
          component={TelBoxField}
          label="Telefonnummer"
          placeholder="Telefonnummer"
        />
        <Field
          name="address"
          component={TextAreaField}
          label="Adresse"
          placeholder="Eksempelveien 10, 0000 Eksempelregion"
        />
      </Form>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          margin: "auto",
          flexDirection: "column",
          width: "330px"
        }}
      >
        <SubmitButton
          onClick={handleSubmit}
          type="submit"
          disabled={isSubmitting}
          valid={isValid}
          width="100%"
        >
          Registrer deg
        </SubmitButton>
        <span style={{ margin: "1rem" }}>eller</span>
        <CancelButton to="/login">Logg inn</CancelButton>
      </div>
    </ContentWrapper>
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
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      approvedTerms: true
    };
  },

  // What happens when you submit the form
  handleSubmit(values, { setSubmitting, props }) {
    var payload = {
      username: values.username,
      email: values.email,
      password1: values.password,
      password2: values.passwordConfirm,
      first_name: values.firstName,
      last_name: values.lastName,
      phone_number: values.phoneNumber,
      address: values.address,
      approved_terms: values.approvedTerms
    };

    props.signupUser(payload);
    setSubmitting(false);
  },

  // Validation of the form
  validationSchema: Yup.object().shape({
    username: Yup.string().required("Skriv inn et brukernavn"),

    email: Yup.string()
      .required("Skriv inn en e-post")
      .email("Skriv inn en e-post"),

    password: Yup.string()
      .required("Passordet må være minst 8 bokstaver")
      .min(8, "Passordet må være minst 8 bokstaver"),

    passwordConfirm: Yup.string()
      .required("Gjenta passordet ditt")
      .equalTo(Yup.ref("password"), "Passordene må være like"),

    firstName: Yup.string("Navnet kan kun inneholde bokstaver")
      .required("Skriv inn ditt fornavn")
      .min(2, "Må være lengre enn 2 bokstaver"),

    lastName: Yup.string("Navnet kan kun inneholde bokstaver")
      .required("Skriv inn ditt etternavn")
      .min(2, "Må være lengre enn 2 bokstaver"),

    phoneNumber: Yup.string("Skriv inn ett telefonnummer")
      .matches(
        /^(0047|\+47|47)?\d{8}$/,
        "Skriv inn et gyldig norsk telefonnummer"
      )
      .required("Skriv inn ett telefonnummer"),

    address: Yup.string("").required("Skriv inn din adresse"),

    approvedTerms: Yup.boolean().oneOf(
      [true],
      "Du må godta retningslinjene for å kunne bruke denne siden"
    )
  })
})(SignUpForm);

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    authenticated: state.auth.authenticated,
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signupUser: payload => dispatch(signupUser(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpPage);
