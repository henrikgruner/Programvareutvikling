import React from "react";
// import * as Yup from "yup";
// import callApi from "../../utils/callApi";
// import { EmailField, PasswordField } from "../../components/form";
// import { Title } from "./styles";
// import { SubmitButton } from "../../components/SubmitButton";
// import { CancelButton } from "../../components/CancelButton";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import * as actions from "../../store/actions/auth";
/*
const LoginForm = ({
  touched,
  errors,
  isSubmitting,
  handleSubmit,
  isValid
}) => {
  return (
    <div>
      <Title>Logg inn</Title>


      <Form>


        <Field name="email" component={EmailField} />
        <Field name="password" component={PasswordField} />

      </Form>

      <SubmitButton
        onClick={handleSubmit}
        type="submit"
        disabled={isSubmitting}
        valid={isValid}
      >
        Logg inn
      </SubmitButton>
      <CancelButton to="/">Avbryt</CancelButton>
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
      email: "",
      password: ""
    };
  },

  // What happens when you submit the form
  handleSubmit(values, { setSubmitting }) {
    var submission = {
      email: values.email,
      password: values.password
    };

    return callApi("/login", {
      method: "POST",
      body: JSON.stringify(submission)
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
    email: Yup.string()
      .required("Skriv inn en e-mail")
      .email("Skriv inn en e-mail"),

    password: Yup.string()
      .required("Passordet må være lengre enn 4 bokstaver")
      .min(4, "Passordet må være lengre enn 4 bokstaver")
  })
})(LoginForm);

export default LoginPage;*/

import { Form, Icon, Input, Button, Spin } from "antd";

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onAuth(values.userName, values.password);
      }
    });
    this.props.history.push("/");
  };

  render() {
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        {errorMessage}
        {this.props.loading ? (
          <Spin indicator={antIcon} />
        ) : (
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator("userName", {
                rules: [
                  { required: true, message: "Skriv inn ditt brukernavn" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Username"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [{ required: true, message: "Skriv inn ditt passord" }]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: "10px" }}
              >
                Login
              </Button>
              Or
              <NavLink style={{ marginRight: "10 px" }} to="/signup/">
                {" "}
                signup
              </NavLink>
            </Form.Item>
          </Form>
        )}
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({})(NormalLoginForm);

const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, password) =>
      dispatch(actions.authLogin(username, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedNormalLoginForm);
