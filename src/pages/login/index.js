import React from "react";

import styled from "styled-components";

import { PrimaryButton } from "office-ui-fabric-react";
import { Link } from "@reach/router";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Login = () => {
  return (
    <Container>
        <div id="firebaseui-auth-container"></div>
        
      <Link to="/list">
        <PrimaryButton>{"Login"}</PrimaryButton>
      </Link>
    </Container>
  );
};

export default Login;
