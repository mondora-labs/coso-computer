import React from "react";

import { Checkbox } from "office-ui-fabric-react";
import styled from "styled-components";
import { ErrorMessage } from "formik";

const errorClass = {
  color: "rgb(164, 38, 44)",
  textDecoration: "underline"
};

const ErrorMessageWrapper = styled.div`
  color: rgb(164, 38, 44);
  font-size: 12px;
  height: 8px;
  margin: 0 24px !important;
`;

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
        className={(touched[name] && errors[name]) && errorClass}
        onChange={(event, checked) =>
          handleChange({ target: { name, value: checked } })
        }
        checked={value}
        {...rest}
      />
      <ErrorMessageWrapper>
        <ErrorMessage name={name} />
      </ErrorMessageWrapper>
    </>
  );
};

export default FormikCheckbox;
