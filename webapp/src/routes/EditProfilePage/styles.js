import styled from "styled-components/macro";
import PageWrapper from "../../components/ContentWrapper";
import { Form as FormikForm } from "formik";

export const ContentWrapper = styled(PageWrapper)`
  overflow: hidden;
  padding-bottom: 60px;
`;

export const Form = styled(FormikForm)`
  padding: 10px 0;
  width: 330px;
  margin: auto;
`;
