import React from "react";
import * as Yup from "yup";
import { TextBoxField, PasswordField } from "../../components/form";
import { SubmitButton } from "../../components/SubmitButton";
import { CancelButton } from "../../components/CancelButton";
import { connect } from "react-redux";
import { loginUser } from "../../store/actions/auth";
import { Field, withFormik } from "formik";
import { Redirect } from "react-router-dom";
import { Title } from "../../components/Title";
import { ContentWrapper, Form } from "./styles";

const LoginForm = ({
  touched,
  errors,
  isSubmitting,
  handleSubmit,
  isValid,
  loading,
  error,
  location,
  authenticated
}) => {
  if (loading) {
    return <span>Loading ...</span>;
  }

  if (authenticated) {
    let { from } = location.state || { from: { pathname: "/" } };
    return <Redirect to={from} />;
  }

  return (
    <ContentWrapper>
      <Title>Logg inn</Title>
      {error && (
        <div style={{ textAlign: "center", color: "var(--warning-red)" }}>
          Brukernavn eller passord er feil
        </div>
      )}
      <Form>
        <Field
          name="username"
          component={TextBoxField}
          placeholder="Brukernavn.."
          label="Brukernavn"
        />
        <Field
          name="password"
          component={PasswordField}
          placholder="Passord.."
          label="Passord"
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
          Logg inn
        </SubmitButton>
        <span style={{ margin: "1rem" }}>eller</span>
        <CancelButton to="/signup">Registrer deg</CancelButton>
      </div>
    </ContentWrapper>
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
      username: "",
      password: ""
    };
  },

  // What happens when you submit the form
  handleSubmit(values, { setSubmitting, props }) {
    var payload = {
      username: values.username,
      password: values.password
    };

    props.loginUser(payload);
    setSubmitting(false);
  },

  // Validation of the form
  validationSchema: Yup.object().shape({
    username: Yup.string().required("Skriv inn brukernavnet ditt"),

    password: Yup.string().required("Skriv inn et passord")
  })
})(LoginForm);

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    authenticated: state.auth.authenticated,
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginUser: payload => dispatch(loginUser(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
