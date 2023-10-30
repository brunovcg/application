import styled from 'styled-components';
import { IconSize } from '../icon/Icon.types';
import { StyledButtonIconProps } from './ButtonIcon.types';
import Constants from '../../../../utils/constants/Constants';
const { COLORS, BACKGROUND_COLORS } = Constants;

const getDimension = (size: IconSize) => {
  const sizes = {
    tiny: '15px',
    small: '20px',
    medium: '28px',
    large: '40px;',
  };

  return sizes[(size as keyof object) ?? 'medium'];
};

const handleBorder = (props: StyledButtonIconProps) => {
  if (!props.showBorder) {
    return 'none';
  }

  if (props.disabled) {
    return `1px solid ${COLORS.disabled}`;
  }

  if (props.variant) {
    return `1px solid ${COLORS[props.variant]}`;
  }
  return 'none';
};

export const StyledButtonIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .im-button-icon-label {
    font-size: 10px;
    font-weight: bold;
  }
`;

export const StyledButtonIcon = styled.button<StyledButtonIconProps>`
  display: flex;
  visibility: ${(props) => (props.hide ? 'hidden' : 'visible')};
  justify-content: center;
  align-items: center;
  border: ${(props) => handleBorder(props)};
  border-radius: 50%;
  background-color: ${(props) => (props.inverted ? COLORS[props.variant] : BACKGROUND_COLORS.white)};
  width: ${(props) => getDimension(props.size)};
  height: ${(props) => getDimension(props.size)};
  position: relative;
  padding: 3px;
  margin: 0 3px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};

  &:hover:not(span) {
    background-color: ${(props) => !props.disabled && COLORS.hover};
    opacity: ${(props) => !props.disabled && '54%'};
  }
`;
