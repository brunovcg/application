import styled from 'styled-components';
import { StyledRadioGroupProps } from './RadioGroup.types';

const StyledRadioGroup = styled.div<StyledRadioGroupProps>`
  width: ${(props) => props.width};
  max-width: ${(props) => props.maxWidth};

  .im-radio-group-header-equalizer {
    margin-top: 30px;
  }
  .im-radio-group-content {
    padding: 10px;
    display: flex;
    gap: 20px;
    flex-direction: ${(props) => (props.row ? 'row' : 'column')};
    flex-wrap: wrap;
    justify-content: ${(props) => (props.center ? 'center' : 'flex-start')};
  }
`;

export default StyledRadioGroup;
