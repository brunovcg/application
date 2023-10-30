import styled from 'styled-components';
import { StyledTitleProps, TextAlign, TitleSize } from './Title.types';
import Constants from '../../../../utils/constants/Constants';
import { ColorsVariant } from '../../../../types';

const { COLORS } = Constants;

const handleVariant = (variant: ColorsVariant = 'dark') => COLORS[`${variant}`];

const handleSize = (size: TitleSize = 'medium') => {
  const sizes = {
    small: '15px',
    medium: '16px',
    regular: '19px',
    large: '23px',
    huge: '26px',
  };

  return sizes[`${size}`];
};

const handleAlignment = (align: TextAlign = 'left') => {
  const aligns = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end',
  };

  return aligns[`${align}`];
};

const StyledTitle = styled.div<StyledTitleProps>`
  word-break: break-word;
  display: flex;
  align-items: center;
  justify-content: ${(props) => handleAlignment(props.align)};
  gap: 5px;
  margin-bottom: ${(props) => props.marginBottom ?? '20px'};
  h3 {
    user-select: none;
    color: ${(props) => handleVariant(props.variant)};
    font-size: ${(props) => handleSize(props.size)};
    line-height: 1.1;
  }
`;

export default StyledTitle;
