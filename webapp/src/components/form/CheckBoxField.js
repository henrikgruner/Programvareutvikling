import React from "react";
import InputValidationFeedback from "./InputValidationFeedback";
import { StyledField } from "./styles";

const CheckBoxField = ({
  label,
  field: { name, onChange, value },
  form: { touched, errors, handleBlur }
}) => {
  const error = touched[name] && errors[name];

  return (
    <div>
      <InputValidationFeedback error={error} />

      <label style={{ display: "flex" }}>
        <StyledField
          type="checkbox"
          name={name}
          checked={value}
          style={{ width: "40px" }}
        />
        {label}
      </label>
    </div>
  );
};

export default CheckBoxField;
