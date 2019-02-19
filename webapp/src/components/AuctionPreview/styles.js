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


export const Test = styled.div`
    background-color: #e0e4e5;
    width: 250px;
    min-height: 225px;
    margin: 30px auto;
    box-sizing: border-box;
    border:1px solid black;
`;
export const Text = styled.h1`
  display:flex;
  align-items:flex-end;
  justify-content:center;
  font-weight: bold;
  font-size:20px;
  font-color:yellow;  
`;

