import styled, { css } from 'styled-components';
import { StyledRowProps } from './Row.types';

const StyledRow = styled.div<StyledRowProps>`
  display: flex;
  flex-direction: row;
  align-items: ${(props) => props.align};
  ${(props) =>
    props.wrap &&
    css`
      flex-wrap: wrap;
    `};

  ${(props) =>
    props.gap &&
    css`
      gap: ${props.gap.map((item) => item + props.gapUnit).join(' ')};
    `};
`;

export default StyledRow;
