import styled from "styled-components";

import logoM from "./images/mlogo.png";

const Logo = styled.img.attrs({
  src: logoM
})`
  height: ${props => props.height ? props.height : "24px"};
  margin: 24px 0;
`;

export default Logo;
