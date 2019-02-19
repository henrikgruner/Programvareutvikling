import styled from "styled-components";
import { Link } from 'react-router-dom';




export const Title = styled.h1`
  font-weight: bold;
`;

export const StyledLink = styled(Link)`

text-decoration: none;
color:black;
margin-left:50px;


    &:hover {
      opacity: 20;
      text-decoration: none;
      color:gray;
    }

       

`;



