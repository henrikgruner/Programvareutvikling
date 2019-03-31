import React from "react";
import InputValidationFeedback from "./InputValidationFeedback";
import { StyledField } from "./styles";

const PasswordField = ({
  field: { name, onChange, value },
  form: { touched, errors, handleBlur },
  label = "Passord",
  placeholder = "Skriv inn et passord"
}) => {
  const error = touched[name] && errors[name];

  return (
    <div>
      <label>
        <InputValidationFeedback error={error} />
        <StyledField
          type="password"
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

export default PasswordField;
