import React from "react";

import { TextField } from "office-ui-fabric-react";

const FormikTextfield = ({
  name,
  values,
  label,
  error,
  touchedField,
  handleChange,
  ...rest
}) => {
  const value = values[name];
  return (
    <TextField
      name={name}
      label={label}
      placeholder="Please enter text here"
      errorMessage={ error}
      onChange={(event, text) =>
        handleChange({ target: { name, value: text } })
      }
      value={value}
      {...rest}
    />
   
  );
};

export default FormikTextfield;
