import React from "react";
import InputValidationFeedback from "./InputValidationFeedback";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import addDays from "date-fns/addDays";
import setMinutes from "date-fns/setMinutes";
import setHours from "date-fns/setHours";
import nb from "date-fns/locale/nb";
import "./styles.css";

registerLocale("nb", nb);

const DateTimePickerField = ({
  placeholder,
  label,
  field: { name, onChange, value },
  form: { touched, errors, handleBlur, setFieldValue }
}) => {
  const error = touched[name] && errors[name];

  const handleChange = date => {
    setFieldValue(name, date);
  };

  return (
    <div>
      <label>
        <InputValidationFeedback error={error} />

        <DatePicker
          className="dateTimePicker"
          selected={value}
          onChange={handleChange}
          placeholderText={label}
          showTimeSelect
          locale="nb"
          timeFormat="HH:mm"
          timeIntervals={60}
          dateFormat="d. MMMM, 'kl.' HH:mm"
          timeCaption="Kl."
          minTime={setHours(setMinutes(new Date(), 0), 8)}
          maxTime={setHours(setMinutes(new Date(), 59), 23)}
          injectTimes={[setHours(setMinutes(new Date(), 59), 23)]}
          minDate={new Date()}
          maxDate={addDays(new Date(), 20)}
          required={true}
          shouldCloseOnSelect={false}
          showWeekNumbers={true}
        />
      </label>
    </div>
  );
};

export default DateTimePickerField;
