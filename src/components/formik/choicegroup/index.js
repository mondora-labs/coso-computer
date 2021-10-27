import React from "react";

import styled from "styled-components";

import { ChoiceGroup } from "office-ui-fabric-react";
import { ErrorMessage } from "formik";

const ErrorMessageWrapper = styled.span`
  color: rgb(164, 38, 44);
  font-size: 12px;
  height: 8px;
`;

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
      <ErrorMessage name={name}>
        {(msg) => <ErrorMessageWrapper>{msg}</ErrorMessageWrapper>}
      </ErrorMessage>
    </>
  );
};

export default FormikChoiceGroup;
