import styled from 'styled-components';
import { StyledPopoverContentProps } from './Popover.types';

export const StyledPopoverTrigger = styled.div`
  cursor: pointer;
  margin: 0 auto;
  width: fit-content;
`;

export const StyledPopoverContent = styled.div<StyledPopoverContentProps>`
  background: var(--container-white-color);
  padding: 15px;
  z-index: ${(props) => props.zIndex};
  border: 1px solid var(--border-color);
  border-radius: var(--container-border-radius);
  position: relative;

  .im-popover-content-close {
    position: absolute;
    top: 0;
    right: 0;
    margin: 10px;
  }

  .im-popover-content-data {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 8px;
    .im-popover-content-title {
      font-size: 13px;
      color: var(--typeface-medium-color);
      font-weight: bold;
    }
  }
`;
