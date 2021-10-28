import React from "react";

import { Dropdown } from "office-ui-fabric-react/lib/Dropdown";
import ErrorBar from "../error-bar";

const FormikPicker = ({
  name,
  values,
  label,
  errors,
  touched,
  handleChange,
  options,
  ...rest
}) => (
  <>
    <Dropdown
      name={name}
      label={label}
      options={options}
      placeholder="Seleziona un'opzione "
      styles={{ dropdown: { width: 250 } }}
      defaultSelectedKey={values[name]}
      errorMessage={touched[name] && errors[name] && " "}
      onChange={(event, text) => {
        handleChange({ target: { name, value: text.key } });
      }}
      {...rest}
    />
    <ErrorBar name={name} />
  </>
);

export default FormikPicker;
