import React from "react";

import InputValidationFeedback from "./InputValidationFeedback";
import { StyledField } from "./styles";

const PasswordField = ({
  label,
  field: { name, onChange, value },
  form: { touched, errors, handleBlur }
}) => {
  const error = touched[name] && errors[name];

  return (
    <div>
      <span>
        Passord
        <InputValidationFeedback error={error} />
      </span>

      <StyledField
        type="password"
        name={name}
        value={value}
        placeholder="Skriv inn et passord"
        onChange={onChange}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default PasswordField;
