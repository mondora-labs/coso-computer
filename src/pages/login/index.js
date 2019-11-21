import React from "react";

import styled from "styled-components";

import { PrimaryButton } from "office-ui-fabric-react";
import { Link } from "@reach/router";
import { login } from "../../utils/firebase";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const handleLogin = () => {
  login();
};

const Login = () => {
  return (
    <Container>
      <Link to="/list">
        <PrimaryButton onClick={handleLogin}>{"Login"}</PrimaryButton>
      </Link>
    </Container>
  );
};

export default Login;
