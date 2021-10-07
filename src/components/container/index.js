import React from "react";

import styled from "styled-components";

import { Link } from "@reach/router";
import { IconButton } from "office-ui-fabric-react";

import Logo from "../logo";
import Tooltip from "../tooltip";

import { GOOGLE_FOLDER } from "../../config";

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
        <Tooltip content="Mostra i miei dispositivi" id={"user-tooltip"}>
          <Link to="/app/landing" aria-describedby={"user-tooltip"}>
            <IconButton iconProps={{ iconName: "UserGauge" }} />
          </Link>
        </Tooltip>
        <Tooltip content="Mostra lista completa" id={"list-tooltip"}>
          <Link to="/app/list" aria-describedby={"list-tooltip"}>
            <IconButton iconProps={{ iconName: "BulletedList2" }} />
          </Link>
        </Tooltip>
        <Tooltip content="Cartella moduli firmati" id={"folder-tooltip"}>
          <a
            aria-describedby={"folder-tooltip"}
            target="_blank"
            rel="noopener noreferrer"
            href={GOOGLE_FOLDER}
          >
            <IconButton iconProps={{ iconName: "FolderList" }} />
          </a>
        </Tooltip>
        <Tooltip content="Mostra i log" id={"logs-tooltip"}>
          <Link to="/app/logs" aria-describedby={"logs-tooltip"}>
            <IconButton iconProps={{ iconName: "History" }} />
          </Link>
        </Tooltip>
      </CommandsContainer>
      <ContainerDiv>
        <Link to="../landing">
          <Logo />
        </Link>
        {children}
      </ContainerDiv>
    </>
  );
};

export default Container;
