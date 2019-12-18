import React from "react";

import moment from "moment";

import { DatePicker } from "office-ui-fabric-react";

const format = "DD/MM/YYYY";


const FormikDatepicker = ({
  name,
  values,
  label,
  errors,
  touched,
  handleChange,
  ...rest
}) => {
  const value = values[name];

  return (
    <DatePicker
      textField={{ value, errorMessage:  touched[name] ? errors[name] : ""}}
      name={name}
      label={label}
      placeholder="Seleziona una data..."
      onSelectDate={date => {
        handleChange({ target: { name, value: moment(date).format(format) } });
      }}
      styles={{ root: { width: 250 } }}
      {...rest}
    />
  );
};

export default FormikDatepicker;
