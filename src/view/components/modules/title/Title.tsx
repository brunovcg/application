import { Icon, Tooltip } from '../..';
import { ClassNameHelper } from '../../../../utils/helpers';
import { IconSize } from '../icon/Icon.types';
import StyledTitle from './Title.styled';
import { TitleProps, TitleSize } from './Title.types';

export default function Title({ text, icon, variant = 'medium', size, marginBottom, className, maxCharacters, align }: TitleProps) {
  const classes = ClassNameHelper.conditional({
    ['im-title']: true,
    [`${className}`]: !!className,
  });

  const displayTooltip = (
    <Tooltip trigger={`${text?.substring(0, (maxCharacters as number) + 1).trim()}...`} content={text} help autoEllipsis={false} />
  );

  const handleIconSize = (titleSize: TitleSize = 'medium') => {
    const sizes = {
      small: 'small',
      medium: 'small',
      regular: 'medium',
      large: 'large',
      huge: 'large',
    };

    return sizes[`${titleSize}`] as IconSize;
  };

  const formattedText = !!maxCharacters && text?.length > maxCharacters ? displayTooltip : text;

  return (
    <StyledTitle className={classes} variant={variant} size={size} marginBottom={marginBottom} align={align}>
      {icon && <Icon icon={icon} weight="bold" variant={variant} size={handleIconSize(size)} />}
      <h3>{formattedText}</h3>
    </StyledTitle>
  );
}
