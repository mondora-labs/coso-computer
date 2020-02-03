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
  const value = moment.unix(values[name] / 1000).format("DD/MM/YYYY");

  return (
    <DatePicker
      textField={{ value, errorMessage: touched[name] ? errors[name] : "" }}
      name={name}
      label={label}
      placeholder="Seleziona una data..."
      onSelectDate={date => {
        handleChange({ target: { name, value: date.getTime() } });
      }}
      styles={{ root: { width: 250 } }}
      {...rest}
    />
  );
};

export default FormikDatepicker;
