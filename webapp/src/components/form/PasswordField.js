import React from "react";
import InputValidationFeedback from "./InputValidationFeedback";
import { StyledField } from "./styles";

const PasswordField = ({
  field: { name, onChange, value },
  form: { touched, errors, handleBlur }
}) => {
  const error = touched[name] && errors[name];

  return (
    <div>
      <label>
        Passord
        <InputValidationFeedback error={error} />
        <StyledField
          type="password"
          name={name}
          value={value}
          placeholder="Skriv inn et passord"
          onChange={onChange}
          onBlur={handleBlur}
        />
      </label>
    </div>
  );
};

export default PasswordField;
