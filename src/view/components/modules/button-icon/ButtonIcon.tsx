import { StyledButtonIcon, StyledButtonIconWrapper } from './ButtonIcon.styled';
import { Icon, NotificationBubble } from '../..';
import { ButtonIconProps } from './ButtonIcon.types';
import { ForwardedRef, MouseEvent, forwardRef } from 'react';
import { ClassNameHelper } from '../../../../utils/helpers';

const { conditional } = ClassNameHelper;

function ButtonIcon(
  {
    icon,
    onClick,
    href,
    label,
    variant = 'medium',
    size = 'medium',
    margin = '0',
    className = '',
    stopPropagation,
    preventDefault,
    notifications,
    error,
    disabled,
    hide,
    showBorder,
    notificationMargin,
    iconWeight,
    dataTestId,
    inverted,
    onMouseDown,
  }: ButtonIconProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const setMargin = () => {
    if (notificationMargin) {
      return notificationMargin;
    }
    if (size === 'small') {
      return '-9px 0 0 18px';
    }
    if (size === 'medium') {
      return '-5px 0 0 18px';
    }
    return '-3px 0 0 18px';
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (stopPropagation) {
      e?.stopPropagation();
    }
    if (preventDefault) {
      e?.preventDefault();
    }
    onClick?.(e);
  };

  const classes = conditional({
    ['im-button-icon']: true,
    [`${className}`]: !!className,
  });

  const iconSizeMapping = {
    tiny: 'tiny',
    small: 'tiny',
    medium: 'small',
    large: 'large',
    huge: 'huge',
  } as const;

  const iconRenderer = (
    <Icon
      size={iconSizeMapping[`${size}`]}
      icon={icon}
      error={error}
      disabled={disabled}
      margin={margin}
      variant={inverted ? 'white' : variant}
      weight={iconWeight}
    />
  );

  return (
    <StyledButtonIconWrapper ref={ref}>
      <StyledButtonIcon
        showBorder={showBorder}
        className={classes}
        size={size}
        onClick={handleClick}
        onMouseDown={onMouseDown}
        disabled={disabled}
        hide={hide}
        variant={variant}
        data-testid={dataTestId ?? 'im-button-icon'}
        inverted={inverted}
      >
        {href && (
          <a href={href} target="_blank" rel="noreferrer">
            {iconRenderer}
          </a>
        )}
        {!href && iconRenderer}
        <NotificationBubble quantity={notifications ?? 0} margin={setMargin()} />
      </StyledButtonIcon>
      {label && <p className="im-button-icon-label">{label}</p>}
    </StyledButtonIconWrapper>
  );
}

export default forwardRef(ButtonIcon);
