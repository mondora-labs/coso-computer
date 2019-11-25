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
  console.log(errors);
  return (
    <TextField
      name={name}
      label={label}
      placeholder="Please enter text here"
      errorMessage={touched[name] ? errors[name] : ""}
      onChange={(event, text) =>
        handleChange({ target: { name, value: text } })
      }
      styles={{ root: { width: 800 } }}
      value={value}
      {...rest}
    />
   
  );
};

export default FormikTextfield;
