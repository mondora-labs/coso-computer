import React from "react";

import styled from "styled-components";
import Logo from "../logo";

const ContainerDiv = styled.div`
  @media (max-width: 1200px) {
    margin: 96px 72px;
  }
  @media (max-width: 768px) {
    margin: 96px 32px;
  }
  margin: 96px 192px;
  justify-content: center;
`;

const Container = ({children}) => {
  return(
    <ContainerDiv>
      <Logo/>
      {children}
    </ContainerDiv>
  );
};

export default Container;
