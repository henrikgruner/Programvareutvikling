import styled from "styled-components";
import Textarea from "react-textarea-autosize";
import { Field } from "formik";

export const InputFeedback = styled.div`
  color: gray;
  margin-top: 0.25rem;
`;

export const StyledTextArea = styled(Textarea)`
  border: 1px solid rgba(0, 0, 0, 0.09);
  border-radius: 3px;
  margin: 0.3em 0 0.5em 0;
  padding: 0.6em 1em;
  resize: none;
  font-size: 1rem;
  width: 15em;
  overflow: hidden;
`;

export const StyledField = styled(Field)`
  border: 1px solid rgba(0, 0, 0, 0.09);
  border-radius: 3px;
  color: black;
  margin: 0.3em 0 0.5em 0;
  padding: 0.6em 1em;
  resize: none;
  font-family: Raleway, "Helvetica Neue", Arial, sans-serif;
  font-size: 1rem;
  width: 15em;
  overflow: hidden;
`;
