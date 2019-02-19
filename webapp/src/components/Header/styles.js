import styled from "styled-components";
import { Link } from 'react-router-dom';

export const Title = styled.h1`
  display:flex;
  font-weight: bold;
  font-size:12px;
  
  
`;


export const CompanyHeader = styled.header`
  display:flex;
  justify-content:center;
  justify-content:space-around;
  background-color:#D7ECEE;
  width:100%;
  height:60px;
  align-items:flex-end;
 
`;

export const CompanyLogo = styled(Link)`
display:flex;
  font-weight: bold;
  font-size:30px;
  color:#001a7a;
 
&:Hover{
  text-decoration:none;
  opacity:20;
  color:gray;
}
`;

