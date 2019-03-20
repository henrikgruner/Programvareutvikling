import React from "react";
import * as Yup from "yup";
import { TextBoxField, PasswordField } from "../../components/form";
import { Title } from "./styles";
import { SubmitButton } from "../../components/SubmitButton";
import { CancelButton } from "../../components/CancelButton";
import { connect } from "react-redux";
import { loginUser } from "../../store/actions/auth";
import { Form, Field, withFormik } from "formik";
import { Redirect } from "react-router-dom";

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
    <div>
      <Title>Logg inn</Title>
      {error && <div>Brukernavn eller passord er feil</div>}
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
        />
      </Form>
      <SubmitButton
        onClick={handleSubmit}
        type="submit"
        disabled={isSubmitting}
        valid={isValid}
      >
        Logg inn
      </SubmitButton>
      <CancelButton to="/signup">Registrer deg</CancelButton>
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
