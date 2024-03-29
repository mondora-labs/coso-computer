import React from "react";

import { useStoreState } from "easy-peasy";

import { Link } from "@reach/router";
import { DefaultButton, Stack } from "office-ui-fabric-react";

import Container from "../container";

const PrivateRoute = ({ children }) => {
  const { isLogged } = useStoreState((state) => state.user);

  if (!isLogged) {
    return (
      <Container>
        <Stack>
          <Stack.Item align="center">
            <p>{"Non autorizzato"}</p>
          </Stack.Item>

          <Stack.Item align="center">
            <Link to="/">
              <DefaultButton iconProps={{ iconName: "home" }}>
                {"Torna alla home"}
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
