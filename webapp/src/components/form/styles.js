import styled from "styled-components/macro";
import Textarea from "react-textarea-autosize";
import { Field } from "formik";

export const InputFeedback = styled.div`
  color: var(--warning-red);
  margin-top: 0.25rem;
  display: block;
  text-align: center;
  font-size: 14px;
`;

export const ImageUploaderWrapper = styled.div`
  width: 200px;
  padding: 0.6em 1em;
  font-size: 1rem;
  margin: 1em 0;
  width: 100%;
  display: block;
  box-sizing: border-box;
  border-radius: 50px;
  border: 1px solid rgba(0, 0, 0, 0.15);
`;

export const StyledTextArea = styled(Textarea)`
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 20px;
  display: block;
  margin: 0.5em 0 1em 0;
  padding: 0.6em 1em;
  resize: none;
  min-height: 80px;
  font-size: 1rem;
  width: 100%;
  font-family: Raleway, "Helvetica Neue", Arial, sans-serif;
  box-sizing: border-box;
`;

export const StyledField = styled(Field)`
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 50px;
  color: black;
  display: block;
  margin: 0.5em 0 1em 0;
  padding: 0.6em 1em;
  height: 3rem;
  resize: none;
  font-family: Raleway, "Helvetica Neue", Arial, sans-serif;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
`;
