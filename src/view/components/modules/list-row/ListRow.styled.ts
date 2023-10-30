import styled, { css } from 'styled-components';
import { StyledListRowProps } from './ListRow.types';
import Constants from '../../../../utils/constants/Constants';

const { COLORS } = Constants;

const StyledListRow = styled.div<StyledListRowProps>`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  ${(props) =>
    props.centered &&
    css`
      justify-content: center;
    `}

  .im-current-list-item {
    color: ${(props) => (props.color ? COLORS[props.color] : 'inherit')};
  }
`;

export default StyledListRow;
