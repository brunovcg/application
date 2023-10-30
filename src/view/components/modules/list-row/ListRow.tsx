import { ReactNode } from 'react';
import { Icon, Tooltip } from '../..';
import StyledListRow from './ListRow.styled';
import { ListRowProps } from './ListRow.types';

export default function ListRow({ list, centered, divisorColor, color }: ListRowProps) {
  const renderer = list.reduce((acc, child, index) => {
    const itemComponent = () => {
      const item = (
        <span key={`item-${child.display}`} className="im-current-list-item">
          {child.display}
        </span>
      );
      if (child.tooltip) {
        return <Tooltip key={`item-${child.display}`} trigger={child.display} content={child.tooltip} />;
      }
      return item;
    };
    const separatorComponent = (
      <Icon icon="separator" size="medium" weight="fill" key={`separator-${child.display}`} variant={divisorColor ?? 'light'} />
    );

    if (index < list.length - 1) {
      return acc?.concat([itemComponent(), separatorComponent]);
    }
    return acc.concat(itemComponent());
  }, [] as ReactNode[]);

  return (
    <StyledListRow className="im-list-row" centered={centered} color={color}>
      {renderer}
    </StyledListRow>
  );
}
