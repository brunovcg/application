import styled from 'styled-components';
import { StyledErrorMessageProps } from './ErrorMessage.types';

const StyledErrorMessage = styled.div<StyledErrorMessageProps>`
  width: ${(props) => props.width};
  max-width: 100%;
  color: red;
  font-size: 12px;
  height: 15px;
  margin: ${(props) => props.margin};

  span {
    display: flex;
    gap: 5px;
    align-items: center;
  }
`;

export default StyledErrorMessage;
