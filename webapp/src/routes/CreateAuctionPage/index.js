import React from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { createAuction } from "../../store/actions/auction";
import { format } from "date-fns";
import {
  TextAreaField,
  TextBoxField,
  FileUploadField,
  DateTimePickerField
} from "../../components/form";
import { SubmitButton } from "../../components/SubmitButton";
import { CancelButton } from "../../components/CancelButton";
import { Title } from "../../components/Title";
import ContentWrapper from "../../components/ContentWrapper";

const CreateAuctionForm = ({
  touched,
  errors,
  isSubmitting,
  handleSubmit,
  isValid
}) => {
  return (
    <ContentWrapper>
      <Title>Lag ny auksjon</Title>
      <Form encType="multipart/form-data">
        <Field
          name="title"
          component={TextBoxField}
          label="Tittel"
          placeholder="Skriv inn tittel.."
        />
        <Field
          name="description"
          component={TextAreaField}
          label="Beskrivelse"
          placeholder="Skriv inn en beskrivelse av produktet.."
        />
        <Field
          name="startprice"
          component={TextBoxField}
          label="Startpris (i kr)"
          placeholder="Sett en startpris.."
        />
        <Field
          name="minbidincrease"
          component={TextBoxField}
          label="Minste bud økning tillatt (i kr)"
          placeholder="Sett en minste budøkning.."
        />
        <Field
          name="pickupaddress"
          component={TextBoxField}
          label="Henteaddresse"
          placeholder="Skriv inn en addresse.."
        />
        <Field
          name="endtime"
          component={DateTimePickerField}
          label="Sluttid"
          placeholder="Velg når auksjonen skal stenge.."
        />
        <Field
          name="images"
          component={FileUploadField}
          label="Bilde av gjenstand"
        />
      </Form>
      <SubmitButton
        onClick={handleSubmit}
        type="submit"
        disabled={isSubmitting}
        valid={isValid}
      >
        Last opp
      </SubmitButton>
      <CancelButton to="/">Avbryt</CancelButton>
    </ContentWrapper>
  );
};

// Highest order component for login form.
// Handles form values, submit post and form validation.

const mapStateToProps = state => {
  return {
    token: state.token
  };
};

const CreateAuctionPage = connect(mapStateToProps)(
  withFormik({
    displayName: "LoginForm",
    validateOnChange: true,
    enableReinitialize: true,

    mapPropsToValues() {
      return {
        title: "",
        description: "",
        startprice: "",
        endtime: null,
        pickupaddress: "",
        minbidincrease: "",
        images: []
      };
    },

    // What happens when you submit the form
    handleSubmit(values, { setSubmitting, props }) {
      var formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("start_price", values.startprice);
      formData.append(
        "end_time",
        format(values.endtime, "yyyy-MM-dd HH:mm:ss.uuuuuuZ")
      );
      formData.append("pickup_address", values.pickupaddress);
      formData.append("min_bid_increase", values.minbidincrease);

      for (let i = 0; i < values.images.length; i++) {
        formData.append("image_" + i, values.images[i], values.images[i].name);
      }

      props.createAuction(formData);
      setSubmitting(false);
    },

    // Validation of the form
    validationSchema: Yup.object().shape({
      title: Yup.string()
        .required("Lag en tittel på auksjonen")
        .max(80, "Maks 80 bokstaver"),

      description: Yup.string().required("Skriv noe om tingen"),

      startprice: Yup.number()
        .typeError("Fyll inn et tall")
        .required("Fyll inn en startpris")
        .moreThan(-1, "Kan ikke være negativt")
        .integer("Må være et heltall"),

      endtime: Yup.date().required("Må fylle inn slutttid"),

      pickupaddress: Yup.string().required("Skriv inn en henteaddresse"),

      minbidincrease: Yup.number()
        .typeError("Fyll inn et tall")
        .required("Fyll inn en minste budøkning, 0 for ingen")
        .moreThan(-1, "Kan ikke være negativt")
        .integer("Må være et heltall")
    })
  })(CreateAuctionForm)
);

const mapDispatchToProps = dispatch => {
  return {
    createAuction: payload => dispatch(createAuction(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateAuctionPage);
