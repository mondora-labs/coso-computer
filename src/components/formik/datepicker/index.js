import React from "react";

import moment from "moment";

import { DatePicker } from "office-ui-fabric-react";

const FormikDatepicker = ({
  name,
  values,
  label,
  errors,
  touched,
  handleChange,
  ...rest
}) => {
  const initialValue = values[name]
    ? moment.unix(values[name] / 1000)
    : moment(new Date());
  console.log(initialValue);
  const value = initialValue.format("DD/MM/YYYY");
  return (
    <DatePicker
      textField={{ value, errorMessage: touched[name] ? errors[name] : "" }}
      name={name}
      label={label}
      placeholder="Seleziona una data..."
      initialPickerDate={initialValue.toDate()}
      onSelectDate={date => {
        handleChange({ target: { name, value: date.getTime() } });
      }}
      styles={{ root: { width: 250 } }}
      {...rest}
    />
  );
};

export default FormikDatepicker;
