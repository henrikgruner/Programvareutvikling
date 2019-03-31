import styled from "styled-components";
import { SubmitButton } from "../../components/SubmitButton";

export const WrapperDiv = styled.div`
  display: flex;
  margin: 10px;
  flex-wrap: wrap;
  width: 700px;
  text-align: center;
  margin: 3rem auto;
`;

export const DeleteButton = styled(SubmitButton)`
  background-color: var(--warning-red);
  font-size: 1rem;
  margin: 2rem auto;
`;
