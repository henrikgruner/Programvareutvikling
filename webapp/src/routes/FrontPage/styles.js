import styled from "styled-components";
import { Link } from 'react-router-dom'

export const StyledLink = styled(Link)`
display:flex;
text-Decoration:'none';
color:black;
font-size:12pt;
&:Hover{
  opacity:20;
  color:gray;
}
`;
