import React from "react";

import { TextField } from "office-ui-fabric-react";

const FormikTextfield = ({
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
    <TextField
      name={name}
      label={label}
      placeholder="Inserisci testo"
      errorMessage={touched[name] && errors[name]}
      value={value}
      onChange={(event, text) =>
        handleChange({ target: { name, value: text } })
      }
      {...rest}
    />
   
  );
};

export default FormikTextfield;
