import React from "react";

import { Dropdown } from "office-ui-fabric-react/lib/Dropdown";

const assetTypes = [
  { key: "notebook", text: "Notebook" },
  { key: "smartphone", text: "Smartphone" },
  { key: "tablet", text: "Tablet" },
  { key: "accessori", text: "Accessori" }
];

const dropdownStyles = {
  dropdown: { width: 250 }
};

const FormikDevicepicker = ({
  name,
  values,
  label,
  errors,
  touched,
  handleChange,
  ...rest
}) => {
  return (
    <Dropdown
      name={name}
      label={label}
      options={assetTypes}
      placeholder="Select an option"
      styles={dropdownStyles}
      defaultSelectedKey={values[name]}
      errorMessage={touched[name] ? errors[name] : ""}
      onChange={(event, text) => {
        handleChange({ target: { name, value: text.key } });
      }}
      {...rest}
    />
  );
};

export default FormikDevicepicker;
