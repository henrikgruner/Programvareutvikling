import React from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { Report } from "../../store/actions/report";

import { SubmitButton } from "../../components/SubmitButton";
import { CancelButton } from "../../components/CancelButton";
import { Title } from "./styles";
import {
    TextAreaField
} from "../../components/form";


const ReportForm = ({
    isSubmitting,
    handleSubmit,
    isValid

  }) => {
    return (
      <div>
        <Title>Rapportér auksjon</Title>
        <Form>
          <Field
            name="reportDescription"
            component={TextAreaField}
            placeholder="Skriv her ..."
          />
        </Form>
        <SubmitButton
          onClick={handleSubmit}
          type="submit"
          disabled={isSubmitting}
          valid={isValid}
        >
          Rapporter
        </SubmitButton>
        <CancelButton to="/">Avbryt</CancelButton>
      </div>
    );
  };


const mapStateToProps = state => {
  return {
      token: state.token
    };
  };

function getCookie() {
  var name = "id=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

const ReportPage = connect(mapStateToProps)(
  withFormik({
    displayName: "ReportForm",
    validateOnChange: true,
    enableReinitialize: true,
  
    mapPropsToValues() {
      return {
        reportDescription: "",
        auction: getCookie()
      };
    },
  
    handleSubmit(values, { setSubmitting, props }) {
      var report = {
        auction: `http://127.0.0.1:8000/auctions/${values.auction}/`,
        reportDescription: values.reportDescription,
      };

      props.Report(report);
      setSubmitting(false);
    },

    validationSchema: Yup.object().shape({
      reportDescription: Yup.string().required("Skriv din rapport")
      .max(280)
    })
  })(ReportForm)
);

const mapDispatchToProps = dispatch => {
  return {
    Report: report => dispatch(Report(report))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(ReportPage)