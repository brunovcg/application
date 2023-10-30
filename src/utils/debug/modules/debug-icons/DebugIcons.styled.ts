import styled from 'styled-components';
import Constants from '../../../constants/Constants';
import { ColorsVariant } from '../../../../types';

const { BACKGROUND_COLORS } = Constants;

const StyledDebugIcons = styled.div<{ variant: ColorsVariant }>`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;

  .im-debug-dialog-header {
    display: flex;
    gap: 40px;
  }

  .im-debug-icons-container {
    display: flex;
    flex-direction: row;
    gap: 20px;
    flex-wrap: wrap;

    .im-debug-icons-item {
      display: flex;
      flex-direction: column;
      border: 1px solid var(--border-color);
      background-color: ${(props) => (props.variant === 'white' ? BACKGROUND_COLORS.deep : BACKGROUND_COLORS.white)};
      padding: 6px;
      gap: 10px;
      width: 100px;
      align-items: center;
      cursor: pointer;

      .im-debug-icons-name {
        font-size: 12px;
        color: var(--typeface-light-color);
      }
    }
  }
`;

export default StyledDebugIcons;
