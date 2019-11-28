import React from "react";

import {
  Dropdown,
  IDropdownStyles,
  IDropdownOption
} from "office-ui-fabric-react/lib/Dropdown";

const assetTypes: IDropdownOption[] = [
  { key: "notebook", text: "Notebook" },
  { key: "smartphone", text: "Smartphone" },
  { key: "tablet", text: "Tablet" },
  { key: "accessori", text: "accessori" }
];

const dropdownStyles: Partial<IDropdownStyles> = {
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
    console.log(values);
  const value = values[name];

  return (
    <Dropdown
      name={name}
      placeholder="Select an option"
      label={label}
      options={assetTypes}
      styles={dropdownStyles}
      errorMessage={touched[name] ? errors[name] : ""}
      value={value}
      onChange={(event, text) => {
        handleChange({ target: { name, value: text.key } });
      }}
      {...rest}
    />
  );
};

export default FormikDevicepicker;
