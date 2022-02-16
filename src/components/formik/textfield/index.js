import React from "react";

import { TextField } from "office-ui-fabric-react";
import ErrorBar from "../error-bar";

const FormikTextfield = ({
  name,
  values,
  label,
  errors,
  touched,
  handleChange,
  placeHolder,
  ...rest
}) => {
  const value = values[name];

  return (
    <>
      <TextField
        name={name}
        label={label}
        placeholder={placeHolder || "Inserisci testo"}
        errorMessage={touched[name] && errors[name] && " "}
        value={value}
        onChange={(event, text) =>
          handleChange({ target: { name, value: text } })
        }
        {...rest}
      />
      <ErrorBar name={name} />
    </>
  );
};

export default FormikTextfield;
