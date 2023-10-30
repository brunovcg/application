import styled from 'styled-components';
import { StyledInputCurrency } from './InputCurrency.types';

const StyledCurrency = styled.div<StyledInputCurrency>`
  width: ${(props) => props.width ?? '100%'};
  .im-input-currency-container {
    height: 42px;
    width: 100%;
    display: flex;
    .im-input-currency-input {
      height: 100%;
      border: none;
      border-radius: var(--container-border-radius);
      padding-left: 15px;
      flex: 1;
    }
  }

  &.im-negative {
    .im-input-currency-input {
      color: var(--error-color);
    }
  }
`;

export default StyledCurrency;
