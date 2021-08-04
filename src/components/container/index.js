import React from "react";

import styled from "styled-components";

import { Link } from "@reach/router";
import { IconButton } from "office-ui-fabric-react";

import Logo from "../logo";
import Tooltip from "../tooltip";

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
        <Tooltip content="Cartella moduli firmati" id={"folder-tooltip"}>
          <a
            aria-describedby={"folder-tooltip"}
            target="_blank"
            rel="noopener noreferrer"
            href="https://drive.google.com/drive/u/0/folders/1tkTVZ5snIbjTXbUL0FgCnBrD0fKWXUTj"
          >
            <IconButton iconProps={{ iconName: "FolderList" }} />
          </a>
        </Tooltip>
        <Tooltip content="Mostra i log" id={"logs-tooltip"}>
          <Link to="/app/logs" aria-describedby={"folder-tooltip"}>
            <IconButton iconProps={{ iconName: "History" }} />
          </Link>
        </Tooltip>
      </CommandsContainer>
      <ContainerDiv>
        <Link to="/list">
          <Logo />
        </Link>
        {children}
      </ContainerDiv>
    </>
  );
};

export default Container;
