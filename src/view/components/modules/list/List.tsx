import { LisProps } from './List.types';
import './List.scss';
import { ClassNameHelper } from '../../../../utils/helpers';

export default function List({ lines, className }: LisProps) {
  const classes = ClassNameHelper.conditional({
    [`${className}`]: !!className,
    ['im-list']: true,
  });

  return (
    <ul className={classes}>
      {lines.map((line) => (
        <li key={line.id}>{line.text}</li>
      ))}
    </ul>
  );
}
