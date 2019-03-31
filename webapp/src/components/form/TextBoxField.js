import React from "react";
import InputValidationFeedback from "./InputValidationFeedback";
import { StyledField } from "./styles";

const TextBoxField = ({
  placeholder,
  label,
  field: { name, onChange, value },
  form: { touched, errors, handleBlur }
}) => {
  const error = touched[name] && errors[name];

  return (
    <div style={{ width: "100%" }}>
      <label style={{ width: "100%" }}>
        <InputValidationFeedback error={error} />

        <StyledField
          type="text"
          name={name}
          value={value}
          placeholder={label}
          onChange={onChange}
          onBlur={handleBlur}
        />
      </label>
    </div>
  );
};

export default TextBoxField;
