/*import React from "react";
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
        Sign up
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
*/
import React from "react";
import * as actions from "../../store/actions/auth";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import { Form, Input, Icon, Button } from "antd";

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onAuth(
          values.username,
          values.email,
          values.password,
          values.confirm
        );
      }
      this.props.history.push("/");
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="username"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "The input is not valid E-mail!"
              },
              {
                required: true,
                message: "Please input your E-mail!"
              }
            ]
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="email"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "Please input your password!"
              },
              {
                validator: this.validateToNextPassword
              }
            ]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("confirm", {
            rules: [
              {
                required: true,
                message: "Please confirm your password!"
              },
              {
                validator: this.compareToFirstPassword
              }
            ]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
              onBlur={this.handleConfirmBlur}
            />
          )}
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: "10px" }}
          >
            Signup
          </Button>
          Or
          <NavLink style={{ marginRight: "10 px" }} to="/login/">
            {" "}
            login
          </NavLink>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: "register" })(
  RegistrationForm
);

const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, email, password1, password2) =>
      dispatch(actions.authSignup(username, email, password1, password2))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedRegistrationForm);
