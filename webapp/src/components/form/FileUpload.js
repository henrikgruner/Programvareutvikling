import React from "react";

import InputValidationFeedback from "./InputValidationFeedback";

const FileUpload = ({
  label,
  field: { name, setFieldValue },
  form: { touched, errors, handleBlur }
}) => {
  const error = touched[name] && errors[name];

  return (
    <div>
      <span>
        {label}
        <InputValidationFeedback error={error} />
      </span>

      <input
        id="file"
        name="file"
        type="file"
        onChange={event => {
          setFieldValue("file", event.currentTarget.files[0]);
        }}
        className="form-control"
      />
    </div>
  );
};

export default FileUpload;
