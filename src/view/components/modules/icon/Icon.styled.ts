import styled from 'styled-components';
import { StyledIconProps } from './Icon.types';

import Constants from '../../../../utils/constants/Constants';
import { ColorsVariant } from '../../../../types';
const { COLORS } = Constants;

const getColor = (props: StyledIconProps) => {
  if (props.disabled) {
    return COLORS.disabled;
  }
  if (props.error) {
    return COLORS.error;
  }

  return COLORS[props.variant as ColorsVariant];
};

const StyledIcon = styled.span<StyledIconProps>`
  margin: ${(props) => props.margin};
  display: flex;
  align-items: center;

  path {
    color: ${(props) => getColor(props)};
  }

  &:hover {
    color: ${(props) => getColor(props)};
  }
`;

export default StyledIcon;
