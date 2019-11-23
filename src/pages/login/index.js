import React, { useEffect } from "react";

import styled from "styled-components";
import { useStoreActions, useStoreState } from "easy-peasy";

import { PrimaryButton } from "office-ui-fabric-react";
import { navigate } from "@reach/router";

import logoM from "../../images/mlogo.png";

const Container = styled.div`
  width: 100vw;
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Logo = styled.img`
  width: 120px;
  height: 120px;
  display: block;
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
        <Logo src={logoM} />
        <h1>{"Computer :m"}</h1>
        <PrimaryButton onClick={doLogin} iconProps={{ iconName: "Lock" }}>
          {"Login"}
        </PrimaryButton>
    </Container>
  );
};

export default Login;
