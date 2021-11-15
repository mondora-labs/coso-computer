import React, { useEffect } from "react";

import styled from "styled-components";
import { useStoreActions, useStoreState } from "easy-peasy";

import { PrimaryButton } from "office-ui-fabric-react";
import { navigate, useLocation } from "@reach/router";
import { parse } from "query-string";

import Logo from "../../components/logo";

const Container = styled.div`
  width: 100vw;
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Login = () => {
  const { superUser, unsafeEdits, unsafeDelete } = parse(useLocation().search);

  const { isLogged } = useStoreState((state) => state.user);
  const { doLogin, setPermissions } = useStoreActions((state) => state.user);

  useEffect(() => {
    if (isLogged) {
      navigate("/app/landing");
    }
  }, [isLogged]);

  useEffect(() => {
    setPermissions({ superUser, unsafeEdits, unsafeDelete });
  }, [superUser, unsafeEdits, unsafeDelete, setPermissions]);

  return (
    <Container>
      <Logo />

      <PrimaryButton onClick={doLogin} iconProps={{ iconName: "Lock" }}>
        {"Login"}
      </PrimaryButton>
    </Container>
  );
};

export default Login;
