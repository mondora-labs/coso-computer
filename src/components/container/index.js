import React from "react";

import styled from "styled-components";

import { Link } from "@reach/router";
import { IconButton } from "office-ui-fabric-react";

import Logo from "../logo";

const ContainerDiv = styled.div`
  @media (max-width: 1200px) {
    margin: 96px 72px;
  }

  @media (max-width: 768px) {
    margin: 32px;
    margin-top: 0;
  }

  margin: 96px 192px;
  justify-content: center;
`;

const LogsContainer = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
`;

const Container = ({ children }) => {
  return (
    <>
      <LogsContainer>
        <Link to="/app/logs">
          <IconButton iconProps={{ iconName: "History" }} />
        </Link>
      </LogsContainer>
      <ContainerDiv>
        <Logo />
        {children}
      </ContainerDiv>
    </>
  );
};

export default Container;
