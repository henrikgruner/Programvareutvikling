import React, { Component } from "react";
import ImageUploader from "react-images-upload";
import axios from "axios";

import InputValidationFeedback from "./InputValidationFeedback";

class FileUpload extends Component {
  state = {
    selectFile: null
  };

  fileSelectHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    });
  };

  fileUploadHand = () => {
    const formData = new FormData();
    formData.append(
      "myFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    callApi("/login", {
      method: "POST",
      body: JSON.stringify(formData)
    })
      .then(console.log("woho, success"))
      .catch(err => {
        alert("Det skjedde en feil.... ");
        setSubmitting(false);
        throw err;
      });
  };

  render() {
    const { label } = this.props;
    const { name, setFieldValue } = this.props.field;
    const { touched, errors } = this.props.form;
    const error = touched[name] && errors[name];

    return (
      <div>
        <span>
          {label}
          <InputValidationFeedback error={error} />
        </span>

        <input
          style={{ display: "none" }}
          type="file"
          onChange={this.fileSelectHandler}
          ref={fileInput => (this.FileInput = fileInput)}
        />
        <button onClick={this.fileInput.click()}>Velg fil </button>
        <button onClick={this.fileUploadHand}>Last opp</button>
      </div>
    );
  }
}

export default FileUpload;
