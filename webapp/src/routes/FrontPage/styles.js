import styled from "styled-components";
import { Link } from 'react-router-dom'

export const StyledLink = styled(Link)`
display:flex;
text-decoration:'none';
color:black;
font-size:12pt;
&:hover{
  opacity:20;
  color:gray;
}
`;

export const StyledDiv = styled.div`
over-flow:hidden;
padding-bottom:60px;
position:relative;
min-height:110vh;
display:block;
`

