import styled from 'styled-components';
import { StyledFormProps } from './Form.types';

export const StyledForm = styled.form<StyledFormProps>`
  width: ${(props) => props.width};
  display: flex;
  flex-direction: column;
  box-sizing: content-box;
  max-width: 100%;

  .im-form-buttons {
    display: flex;
    justify-content: ${(props) => props.buttonsAlignment ?? 'flex-end'};
    gap: 20px;
    padding: 0 5px;
  }
`;
