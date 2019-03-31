import styled from "styled-components/macro";
import { Link } from "react-router-dom";

import PageWrapper from "../../components/ContentWrapper";
import { Form as FormikForm } from "formik";

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  margin-left: 50px;

  &:hover {
    opacity: 20;
    text-decoration: none;
    color: gray;
  }
`;

export const ContentWrapper = styled(PageWrapper)`
  overflow: hidden;
  padding-bottom: 60px;
`;

export const Form = styled(FormikForm)`
  padding: 10px 0;
  width: 330px;
  margin: auto;
`;
