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
  const value = values[name] ? moment.utc(values[name]) : moment.utc();

  // date pickers constraints
  let minDate;
  let initialDate;
  let pickerDisabled = false;
  // if picker is dateFrom
  if (name === "dateFrom") {
    minDate = moment()
      .utc()
      .toDate();
    initialDate = value.toDate();
    // if picker is dateFrom
  } else if (name === "dateTo") {
    // if picker 'dateFrom' selectet i set min date and default value for 'dateTo'
    if (values["dateFrom"] !== "") {
      minDate = moment
        .utc(values["dateFrom"])
        .add(1, "days")
        .toDate();
      initialDate = moment
        .utc(values["dateFrom"])
        .add(1, "days")
        .toDate();
      // if picker 'dateFrom' not selected -> 'dateTo' disabled
    } else {
      pickerDisabled = true;
    }
  }

  return (
    <DatePicker
      textField={{
        errorMessage: touched[name] && errors[name]
      }}
      name={name}
      label={label}
      minDate={minDate}
      //initialPickerDate={initialDate}
      disabled={pickerDisabled}
      placeholder="Seleziona una data..."
      value={initialDate}
      formatDate={date => moment(date).format("DD/MM/YYYY")}
      onSelectDate={date => {
        handleChange({
          target: { name, value: date.getTime() }
        });
      }}
      styles={{ root: { width: 250 } }}
      {...rest}
    />
  );
};

export default FormikDatepicker;
