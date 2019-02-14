import React from "react";

import InputValidationFeedback from "./InputValidationFeedback";

import { StyledTextArea } from "./styles";

const TextAreaField = ({
  placeholder,
  title,
  field: { name, onChange, value },
  form: { touched, errors, handleBlur }
}) => {
  const error = touched[name] && errors[name];

  return (
    <div>
      <span>
        {title}
        <InputValidationFeedback error={error} />
      </span>

      <StyledTextArea
        type="textarea"
        name={name}
        id={name}
        onChange={onChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        value={value}
        rows="5"
      />
    </div>
  );
};

export default TextAreaField;
