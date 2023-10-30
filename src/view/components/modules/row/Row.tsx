import StyledRow from './Row.styled';
import { RowProps } from './Row.types';

export default function Row({ children, wrap = true, gap, gapUnit, align }: RowProps) {
  return (
    <StyledRow className="im-row" wrap={wrap} gap={gap ?? [0]} gapUnit={gapUnit ?? 'px'} align={align ?? 'center'}>
      {children}
    </StyledRow>
  );
}
