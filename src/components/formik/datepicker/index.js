import React from "react";

import moment from "moment";

import { DatePicker } from "office-ui-fabric-react";
import ErrorBar from "../error-bar";

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

  return (
    <>
      <DatePicker
        textField={{
          errorMessage: touched[name] && errors[name] && " ",
        }}
        name={name}
        label={label}
        placeholder="Seleziona una data..."
        value={value.toDate()}
        formatDate={(date) => moment(date).format("DD/MM/YYYY")}
        onSelectDate={(date) => {
          handleChange({
            target: { name, value: date.getTime() },
          });
        }}
        styles={{ root: { width: 250 } }}
        {...rest}
      />
      <ErrorBar name={name} />
    </>
  );
};

export default FormikDatepicker;
