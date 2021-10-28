import React from "react";

import { Checkbox } from "office-ui-fabric-react";
import ErrorBar from "../error-bar";

const errorClass = {
  color: "rgb(164, 38, 44)",
  textDecoration: "underline",
};

const FormikCheckbox = ({
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
    <>
      <Checkbox
        name={name}
        label={label}
        className={touched[name] && errors[name] && errorClass}
        onChange={(event, checked) =>
          handleChange({ target: { name, value: checked } })
        }
        checked={value}
        {...rest}
      />
      <ErrorBar name={name} />
    </>
  );
};

export default FormikCheckbox;
