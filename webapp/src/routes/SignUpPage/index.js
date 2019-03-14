import React from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import { CancelButton } from "../../components/CancelButton";
import { SubmitButton } from "../../components/SubmitButton";
import { EmailField, PasswordField, TextBoxField } from "../../components/form";
import { Title } from "./styles";
import { signupUser } from "../../store/actions/auth";
import { connect } from "react-redux";
import { equalTo } from "../../utils/validation";

const SignUpForm = ({
  touched,
  errors,
  isSubmitting,
  handleSubmit,
  isValid,
  loading,
  apiError
}) => {
  return loading ? (
    <span>Loading ...</span>
  ) : (
      <div>
        <Title>Lag en ny bruker</Title>
        <Form>
          <Field
            name="username"
            component={TextBoxField}
            placeholder="Brukernavn.."
            label="Brukernavn"
          />
          <Field name="email" component={EmailField} />
          <Field name="password" component={PasswordField} />
          <Field name="passwordConfirm" component={PasswordField} />
        </Form>

        <SubmitButton
          onClick={handleSubmit}
          type="submit"
          disabled={isSubmitting}
          valid={isValid}
        >
          Registrer deg
      </SubmitButton>

        <CancelButton to="/">Logg inn</CancelButton>
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
      username: "",
      email: "",
      password: "",
      passwordConfirm: ""
    };
  },

  // What happens when you submit the form
  handleSubmit(values, { setSubmitting, props }) {
    var payload = {
      username: values.username,
      email: values.email,
      password1: values.password,
      password2: values.passwordConfirm
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
      .equalTo(Yup.ref("password"), "Passordene må være like")
  })
})(SignUpForm);

const mapStateToProps = state => {
  return {
    loading: state.auth.loading
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
