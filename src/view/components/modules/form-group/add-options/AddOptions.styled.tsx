import styled from 'styled-components';
import { StyledAddOptionsProps } from './AddOptions.types';

const StyledAddOptions = styled.div<StyledAddOptionsProps>`
  width: ${(props) => props.width};
  min-height: 84px;
  cursor: pointer;

  .im-add-options-wrapper {
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .im-add-options-header {
      display: flex;
      gap: 10px;
    }

    .im-add-options-content {
      width: 100%;
      display: flex;
      min-height: 65px;
      align-items: center;
      justify-content: center;
      padding: 10px;

      .im-add-options-content-list {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
        max-height: ${(props) => props.maxHeight};
        overflow-y: auto;
      }
    }
  }
`;

export default StyledAddOptions;
