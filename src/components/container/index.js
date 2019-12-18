import React from "react";

import styled from "styled-components";

import { Link } from "@reach/router";
import { IconButton, Stack, Icon } from "office-ui-fabric-react";

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
        <Stack horizontal horizontalAlign="space-between">
          <Stack.Item>
            <Link to="/list">
              <Logo />
            </Link>
          </Stack.Item>

          <Stack.Item align="end">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://drive.google.com/open?id=1EJbn-tS3_d8R8r0_OCFq2Ib301GstInm"
            >
              <Icon
                iconName={"OneDriveFolder16"}
                style={{
                  color: "rgb(96, 94, 92)",
                  fontSize: "40px"
                }}
              />
            </a>
          </Stack.Item>
        </Stack>
        {children}
      </ContainerDiv>
    </>
  );
};

export default Container;
