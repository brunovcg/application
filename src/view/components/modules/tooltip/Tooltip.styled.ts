import styled, { css } from 'styled-components';
import { StyledTooltipContentProps, StyledTooltipProps } from './Tooltip.types';

export const StyledTooltip = styled.div<StyledTooltipProps>`
  width: fit-content;
  max-width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  ${(props) =>
    props.help &&
    css`
      cursor: help;
    `}

  .im-tooltip-trigger {
    max-width: 100%;

    ${(props) =>
      props.autoEllipsis &&
      css`
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      `}
  }
`;

export const StyledTooltipContent = styled.div<StyledTooltipContentProps>`
  border: 1px solid var(--border-dark-color);
  background-color: var(--container-dark-color);
  border-radius: var(--container-border-radius);
  box-shadow: var(--container-box-shadow);
  padding: 8px;
  z-index: ${(props) => props.zIndex};
  word-break: break-word;
  color: var(--typeface-white-color);
  font-weight: bold;
  font-size: 12px;
  top: 0;
  max-width: 300px;
  line-height: 1.5;
`;
