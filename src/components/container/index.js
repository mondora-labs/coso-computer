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

const CommandsContainer = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
`;

const Container = ({ children }) => {
  return (
    <>
      <CommandsContainer>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://drive.google.com/open?id=1EJbn-tS3_d8R8r0_OCFq2Ib301GstInm"
        >
          <IconButton iconProps={{ iconName: "BacklogList" }} />
        </a>
        <Link to="/app/logs">
          <IconButton iconProps={{ iconName: "History" }} />
        </Link>
      </CommandsContainer>
      <ContainerDiv>
        <Logo />
        {children}
      </ContainerDiv>
    </>
  );
};

export default Container;
