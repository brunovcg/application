import styled from 'styled-components';
import { StyledReadonlyProps } from './Readonly.types';

const StyledReadonly = styled.div<StyledReadonlyProps>`
  width: ${(props) => props.width};
  height: 43px;
  flex: ${(props) => props.flexGrow && '1'};
  .im-container-wrapper {
    height: 100%;
  }
  .im-readonly-display {
    display: flex;
    padding: 12px 10px 10px;
    font-size: 14px;
    color: var(--typeface-medium-color);
    display: flex;
    align-items: flex-start;
    width: 100%;
    height: 100%;

    .im-readonly-content {
      height: 100%;
    }
  }
`;

export default StyledReadonly;
