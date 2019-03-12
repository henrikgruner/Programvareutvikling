import React from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import callApi from "../../utils/callApi";
import { connect } from "react-redux";

import {
  TextAreaField,
  TextBoxField,
  //  FileUploadField,
  DateTimePickerField
} from "../../components/form";
import { Title } from "./styles";
import { SubmitButton } from "../../components/SubmitButton";
import { CancelButton } from "../../components/CancelButton";

const CreateAuctionForm = ({
  touched,
  errors,
  isSubmitting,
  handleSubmit,
  isValid
}) => {
  return (
    <div>
      <Title>Legg ut gjenstand for auksjon</Title>
      <Form>
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
        {/* <Field
          name="images"
          component={FileUploadField}
          label="Bilde av gjenstand"
        /> */}
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
    </div>
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
        images: [],
        startprice: "",
        endtime: null,
        pickupaddress: "",
        minbidincrease: ""
      };
    },

    // What happens when you submit the form
    handleSubmit(values, { setSubmitting, props }) {
      var submission = {
        // The keys must be the same as in the backend
        title: values.title,
        description: values.description,
        start_price: values.startprice,
        end_time: values.endtime,
        pickup_address: values.pickupaddress,
        min_bid_increase: values.minbidincrease,
        image_1: values.images[0]
      };

      console.log("submission", props, submission);

      return callApi("/auctions/", {
        method: "POST",
        body: JSON.stringify(submission),
        token: props.token
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

export default CreateAuctionPage;
