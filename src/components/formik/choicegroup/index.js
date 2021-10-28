import React from "react";

import { ChoiceGroup } from "office-ui-fabric-react";
import ErrorBar from "../error-bar";

const FormikChoiceGroup = ({
  name,
  values,
  label,
  errors,
  touched,
  handleChange,
  options,
  ...rest
}) => {
  const choiceOpt = options.map((option) => ({
    ...option,
    iconProps: { iconName: option.icon },
    styles: touched[name] &&
      errors[name] && { root: { border: "1px solid rgb(164, 38, 44)" } },
  }));
  const value = values[name];

  return (
    <>
      <ChoiceGroup
        name={name}
        selectedKey={value}
        options={choiceOpt}
        label={label}
        onChange={(event, option) => {
          handleChange({ target: { name, value: option.key } });
        }}
      />
      <ErrorBar name={name} />
    </>
  );
};

export default FormikChoiceGroup;
