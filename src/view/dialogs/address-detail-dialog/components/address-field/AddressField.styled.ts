import styled from 'styled-components';
import { StyledAddressFieldProps } from './AddressField.types';

export const StyledAddressField = styled.div<StyledAddressFieldProps>`
  width: ${(props) => props.width};
  /* flex: 1; */
  height: ${(props) => props.height};
  display: flex;

  .im-address-field-content {
    padding: 10px;
    font-size: 12px;
    width: 100%;
    height: 45px;
    display: flex;
    align-items: center;

    .im-address-field-value {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
`;
