/* eslint-disable indent */
import styled, { css } from 'styled-components';
import { StyledTextProps } from './Text.types';
import Constants from '../../../../utils/constants/Constants';

const { COLORS } = Constants;

const StyledText = styled.div<StyledTextProps>`
  position: relative;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  .im-text-wrapper {
    overflow: hidden;
    padding: 3px;
    border: 1px solid transparent;

    &:hover {
      ${(props) =>
        props.showMore &&
        css`
          overflow: visible;
          border-color: var(--primary-color);
          border-radius: var(--container-border-radius);
          background-color: var(--container-light-color);
          box-shadow: var(--container-box-shadow);
          .im-text-content {
            display: flex;
          }
        `}
    }

    .im-text-anchor {
      text-decoration: none;
      color: var(--primary-color);
      word-break: break-all;
    }

    .im-text-content {
      color: ${(props) => COLORS[props.variant ?? 'medium']};
    }

    .im-text-content,
    .im-text-content .im-injected-html {
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      white-space: pre-wrap;
      line-height: 1.1;
      text-align: ${(props) => props.align};

      ${(props) => css`
        font-weight: ${props.bold && 'bold'};
      `};

      ${(props) => css`
        font-style: ${props.italic && 'italic'};
      `};

      ${(props) => css`
        -webkit-line-clamp: ${props.maxLines ?? 'unset'};
      `};
    }
  }

  &.im-text-size-tiny {
    font-size: 13px;
  }
  &.im-text-size-small {
    font-size: 14px;
  }
  &.im-text-size-medium {
    font-size: 16px;
  }
  &.im-text-size-large {
    font-size: 18px;
  }

  .im-text-show-more {
    position: absolute;
    bottom: 0;
    right: 0;
  }
`;

export default StyledText;
