import React from "react";
import InputValidationFeedback from "./InputValidationFeedback";
import { StyledField } from "./styles";

const NewPasswordField = ({
  field: { name, onChange, value },
  form: { touched, errors, handleBlur },
  label = "Passord",
  placeholder = "Skriv inn ditt nye passord"
}) => {
  const error = touched[name] && errors[name];

  return (
    <div>
      <label>
        {label}
        <InputValidationFeedback error={error} />
        <StyledField
          type="password"
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={handleBlur}
        />
      </label>
    </div>
  );
};

export default NewPasswordField;
