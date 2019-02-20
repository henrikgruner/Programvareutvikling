import React from "react";
import InputValidationFeedback from "./InputValidationFeedback";
import { StyledField } from "./styles";

const EmailField = ({
  field: { name, onChange, value },
  form: { touched, errors, handleBlur }
}) => {
  const error = touched[name] && errors[name];

  return (
    <div>
      <label>
        Email
        <InputValidationFeedback error={error} />
        <StyledField
          type="email"
          name={name}
          value={value}
          placeholder="ola.nordmann@example.com"
          onChange={onChange}
          onBlur={handleBlur}
        />
      </label>
    </div>
  );
};

export default EmailField;
