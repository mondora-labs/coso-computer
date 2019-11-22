import React, { useEffect } from "react";

import styled from "styled-components";
import { useStoreActions, useStoreState } from "easy-peasy";

import { PrimaryButton } from "office-ui-fabric-react";
import { navigate } from "@reach/router";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Login = () => {
  const { isLogged } = useStoreState(state => state.user);
  const { doLogin } = useStoreActions(state => state.user);

  useEffect(() => {
    if (isLogged) {
      navigate("/app/list");
    }
  }, [isLogged]);

  return (
    <Container>
      <PrimaryButton onClick={doLogin} iconProps={{ iconName: "Lock" }}>
        {"Login"}
      </PrimaryButton>
    </Container>
  );
};

export default Login;
