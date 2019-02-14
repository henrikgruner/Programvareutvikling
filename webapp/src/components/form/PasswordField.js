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
        Password
        <InputValidationFeedback error={error} />
      </span>

      <StyledField
        type="password"
        name={name}
        value={value}
        placeholder="Enter a password .."
        onChange={onChange}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default PasswordField;
