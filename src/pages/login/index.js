import React from "react";

import styled from "styled-components";

import { PrimaryButton } from "office-ui-fabric-react";
import { Link, navigate } from "@reach/router";

import { login } from "../../utils/firebase";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const handleLogin = async () => {
  const result = await login();
  if (result) {
    navigate("/list");
  }
};

const Login = () => {
  return (
    <Container>
      <PrimaryButton onClick={handleLogin} iconProps={{ iconName: "Lock" }}>
        {"Login"}
      </PrimaryButton>
    </Container>
  );
};

export default Login;
