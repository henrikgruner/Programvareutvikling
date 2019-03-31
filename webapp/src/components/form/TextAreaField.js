import React from "react";
import InputValidationFeedback from "./InputValidationFeedback";
import { StyledTextArea } from "./styles";

const TextAreaField = ({
  placeholder,
  label,
  field: { name, onChange, value },
  form: { touched, errors, handleBlur }
}) => {
  const error = touched[name] && errors[name];

  return (
    <div>
      <label>
        <InputValidationFeedback error={error} />
        <StyledTextArea
          type="textarea"
          name={name}
          id={name}
          onChange={onChange}
          onBlur={handleBlur}
          placeholder={label}
          value={value}
          rows="10"
        />
      </label>
    </div>
  );
};

export default TextAreaField;
