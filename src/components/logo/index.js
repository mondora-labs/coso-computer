import styled from "styled-components";

import logoM from "../../images/mlogo.png";

const Logo = styled.img.attrs({
  src: logoM
})`
  height: ${props => props.height};
  margin: ${props => props.margin ? props.margin : "16px 0"};
`;

export default Logo;
