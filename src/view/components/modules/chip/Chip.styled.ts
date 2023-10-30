import styled, { css } from 'styled-components';
import { ChipSize, StyledChipProps } from './Chip.types';
import Constants from '../../../../utils/constants/Constants';
import { ColorsVariant } from '../../../../types';
const { COLORS } = Constants;

const setColor = (variant?: ColorsVariant) => {
  const { custom } = (variant || {}) as { custom: string };
  if (custom) {
    return custom;
  }

  return COLORS[String(variant || 'dark') as ColorsVariant];
};

const handleSize = (size?: ChipSize) => {
  const height = {
    small: '20px',
    medium: '25px',
    large: '35px',
  };

  const fontSize = {
    small: '12px',
    medium: '14px',
    large: '16px',
  };

  return { height: height[(size as keyof typeof height) ?? 'medium'], fontSize: fontSize[(size as keyof typeof fontSize) ?? 'medium'] };
};

const StyledChip = styled.div<StyledChipProps>`
  height: ${(props) => handleSize(props.size).height};
  width: ${(props) => props.width ?? 'fit-content'};
  border: 1px solid ${(props) => (props.disabled ? COLORS.disabled : setColor(props.variant))};
  background-color: var(--container-light-color);
  color: ${(props) => (props.disabled ? COLORS.disabled : setColor(props.variant))};
  font-weight: bold;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: ${(props) => props.maxWidth};
  ${(props) =>
    props.centered &&
    css`
      margin: auto;
    `}

  ${(props) =>
    !!props.onClick &&
    css`
      cursor: pointer;
      &:hover {
        opacity: 90%;
      }
    `}
  .im-chip-content {
    padding: 0 10px;
    font-size: ${(props) => handleSize(props.size).fontSize};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &.im-chip-close-option {
    .im-chip-content {
      padding-right: 0px;
      padding-left: 15px;
    }
  }
`;

export default StyledChip;
