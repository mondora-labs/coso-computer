import React from "react";

import { Link } from "@reach/router";
import { DefaultButton, Stack } from "office-ui-fabric-react";

import Container from "../container";

const PrivateRoute = ({ isLogged, children }) => {
  if (!isLogged && false) {
    return (
      <Container>
        <Stack>
          <Stack.Item align="center">
            <h1>{"Unauthorized"}</h1>

            <Link to="/">
              <DefaultButton iconProps={{ iconName: "home" }}>
                {"Back home"}
              </DefaultButton>
            </Link>
          </Stack.Item>
        </Stack>
      </Container>
    );
  }

  return <>{children}</>;
};

export default PrivateRoute;
