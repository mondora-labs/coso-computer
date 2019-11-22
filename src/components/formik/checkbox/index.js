import React from "react";

import { Checkbox } from "office-ui-fabric-react";

const FormikCheckbox = ({
  name,
  values,
  label,
  handleChange,
  ...rest
}) => {
  const value = values[name];

  return (
    <Checkbox
      name={name}
      label={label}
      onChange={(event, checked) =>
        handleChange({ target: { name, value: checked } })
      }
      checked={value}
      {...rest}
    />
  );
};

export default FormikCheckbox;
