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
            <span>
                {label}
                <InputValidationFeedback error={error} />
            </span>

            <StyledField
                type="tel"
                name={name}
                value={value}
                placeholder="Telefonnummer"
                onChange={onChange}
                onBlur={handleBlur}
            />
        </div>
    );
};

export default TelBoxField;
