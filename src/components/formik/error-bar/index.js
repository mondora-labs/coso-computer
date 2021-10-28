import React from "react";

import { MessageBar, MessageBarType } from "office-ui-fabric-react";
import { ErrorMessage } from "formik";

const ErrorBar = ({ name }) => (
  <ErrorMessage name={name}>
    {(msg) => (
      <MessageBar messageBarType={MessageBarType.error} isMultiline={false}>
        <b>{msg}</b>
      </MessageBar>
    )}
  </ErrorMessage>
);

export default ErrorBar;
