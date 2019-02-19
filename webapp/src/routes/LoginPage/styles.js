import styled from "styled-components";
import React, { Component } from 'react';
import { Link } from 'react-router-dom';




export const Title = styled.h1`
  font-weight: bold;
`;

export const StyledLink = styled(Link)`

text-decoration: none;
color:black;
margin-Left:50px;


    &:hover {
      opacity: 20;
      text-decoration: none;
      color:gray;
    }

       

`;



