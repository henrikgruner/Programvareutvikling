import React from "react";
import { Field, withFormik } from "formik";
import * as Yup from "yup";
// eslint-disable-next-line no-unused-vars
import { equalTo } from "../../utils/validation";
import { CancelButton } from "../../components/CancelButton";
import { SubmitButton } from "../../components/SubmitButton";
import {
  EmailField,
  TextBoxField,
  TelBoxField,
  TextAreaField
} from "../../components/form";
import { connect } from "react-redux";
import { updateUserProfile, updateUser } from "../../store/actions/user";
import { Title } from "../../components/Title";
import { ContentWrapper, Form } from "./styles";

const EditProfileForm = ({
  touched,
  errors,
  isSubmitting,
  handleSubmit,
  isValid
}) => {
  return (
    <ContentWrapper>
      <Title>Endre din profil</Title>

      <Form>
        <Field
          name="firstName"
          component={TextBoxField}
          label="Fornavn"
          placeholder="Ola"
        />
        <Field
          name="lastName"
          component={TextBoxField}
          label="Etternavn"
          placeholder="Nordmann"
        />
        <Field name="email" component={EmailField} />
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
          placeholder="Adresse"
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
          Lagre endringer
        </SubmitButton>
        <span style={{ margin: "1rem" }}>eller</span>
        <CancelButton to="/profile/">Avbryt</CancelButton>
      </div>
    </ContentWrapper>
  );
};

// Highest order component for signup form.
// Handles form values, submit post and form validation.

const EditProfilePage = withFormik({
  displayName: "EditProfileForm",
  validateOnChange: true,
  enableReinitialize: true,

  mapPropsToValues(props) {
    console.log(props);
    return {
      email: props.user.user.email,
      firstName: props.user.user.first_name,
      lastName: props.user.user.last_name,
      phoneNumber: props.user.phone_number,
      address: props.user.address
    };
  },

  // What happens when you submit the form
  handleSubmit(values, { setSubmitting, props }) {
    const payload = {
      email: values.email,
      first_name: values.firstName,
      last_name: values.lastName
    };
    const payload2 = {
      phone_number: values.phoneNumber,
      address: values.address
    };

    props.updateUserProfile({ userId: props.user.user.id, payload: payload2 });
    props.updateUser({ userId: props.user.user.id, payload: payload });
    setSubmitting(false);
  },

  // Validation of the form
  validationSchema: Yup.object().shape({
    firstName: Yup.string("Navnet kan kun inneholde bokstaver")
      .required("Skriv inn ditt fornavn")
      .min(2, "Må være lengre enn 2 bokstaver"),

    lastName: Yup.string("Navnet kan kun inneholde bokstaver")
      .required("Skriv inn ditt etternavn")
      .min(2, "Må være lengre enn 2 bokstaver"),

    email: Yup.string()
      .required("Skriv inn en e-mail")
      .email("Skriv inn en e-mail"),

    phoneNumber: Yup.string("Skriv inn ett telefonnummer")
      .matches(
        /^(0047|\+47|47)?\d{8}$/,
        "Skriv inn et gyldig norsk telefonnummer"
      )
      .required("Skriv inn ett telefonnummer"),

    address: Yup.string("").required("Skriv inn addresse")
  })
})(EditProfileForm);

const mapStateToProps = state => {
  return {
    loading: state.user.loading,
    error: state.user.error,
    user: state.user.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUser: payload => dispatch(updateUser(payload)),
    updateUserProfile: payload => dispatch(updateUserProfile(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfilePage);
