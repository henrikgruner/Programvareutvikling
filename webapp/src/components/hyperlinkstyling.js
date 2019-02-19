import styled from "styled-components";
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
display:flex;
justify-content:center;
align-self:'flex-end';
text-Decoration:'none';
color:black;

&:Hover{
  opacity:20;
  color:gray;
}
`;