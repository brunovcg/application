import styled from 'styled-components';
import { StyledCheckboxGroupProps } from './CheckboxGroup.types';

const StyledCheckboxGroup = styled.div<StyledCheckboxGroupProps>`
  width: ${(props) => props.width};
  max-width: ${(props) => props.maxWidth ?? '100%'};
  .im-checkbox-group-content {
    padding: 10px;
    display: flex;
    gap: 18px;
    flex-direction: ${(props) => (props.row ? 'row' : 'column')};
    flex-wrap: wrap;
  }
`;

export default StyledCheckboxGroup;
