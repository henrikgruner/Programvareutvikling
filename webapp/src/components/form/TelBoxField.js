import React from "react";
import InputValidationFeedback from "./InputValidationFeedback";
import { StyledField } from "./styles";

const TelBoxField = ({
  placeholder,
  label,
  field: { name, onChange, value },
  form: { touched, errors, handleBlur }
}) => {
  const error = touched[name] && errors[name];

  return (
    <div>
      <label>
        {label}
        <InputValidationFeedback error={error} />

        <StyledField
          type="tel"
          name={name}
          value={value}
          placeholder="Telefonnummer"
          onChange={onChange}
          onBlur={handleBlur}
        />
      </label>
    </div>
  );
};

export default TelBoxField;
