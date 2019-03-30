import React from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import { SubmitButton } from "../../components/SubmitButton";
import { PasswordField } from "../../components/form";
import { connect } from "react-redux";
import { changePassword } from "../../store/actions/auth";
import { Title } from "../../components/Title";
import ContentWrapper from "../../components/ContentWrapper";

const ChangePasswordForm = ({
  isSubmitting,
  handleSubmit,
  isValid,
  error,
  authenticated
}) => {
  if (authenticated) {
  }

  return (
    <ContentWrapper>
      <Title>Endre passord</Title>
      {error && <div>Kunne ikke endre passord. Prøv igjen senere.</div>}
      <Form>
        <Field name="oldPassword" component={PasswordField} />
        <Field
          name="newPassword"
          component={PasswordField}
          label="Skriv inn ditt nye passord"
        />
        <Field
          name="passwordConfirm"
          component={PasswordField}
          label="Gjenta ditt nye passord"
        />
      </Form>

      <SubmitButton
        onClick={handleSubmit}
        type="submit"
        disabled={isSubmitting}
        valid={isValid}
      >
        Endre passord
      </SubmitButton>
    </ContentWrapper>
  );
};

const ChangePassword = withFormik({
  displayName: "ChangePasswordForm",
  validateOnChange: true,
  enableReinitialize: true,

  mapPropsToValues() {
    return {
      old_Password: "",
      new_password1: "",
      new_password2: ""
      //new_password1
      //new_password2
      //old_password
    };
  },

  // What happens when you submit the form
  handleSubmit(values, { setSubmitting, props }) {
    var payload = {
      old_Password: values.oldPassword,
      new_password1: values.newPassword,
      new_password2: values.passwordConfirm
    };

    props.changePassword(payload);
    setSubmitting(false);
  },

  // Validation of the form
  validationSchema: Yup.object().shape({
    oldPassword: Yup.string()
      .required("Passordet må være minst 8 bokstaver")
      .min(8, "Passordet må være minst 8 bokstaver"),

    newPassword: Yup.string()
      .required("Passordet må være minst 8 bokstaver")
      .min(8, "Passordet må være minst 8 bokstaver"),

    passwordConfirm: Yup.string()
      .required("Gjenta passordet ditt")
      .equalTo(Yup.ref("newPassword"), "Passordene må være like")
  })
})(ChangePasswordForm);

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    authenticated: state.auth.authenticated,
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changePassword: payload => dispatch(changePassword(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePassword);
