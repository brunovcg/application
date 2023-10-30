import { IconProps, IconSize } from './Icon.types';
import StyledIcon from './Icon.styled';
import { forwardRef, ForwardedRef } from 'react';
import { ClassNameHelper } from '../../../../utils/helpers';
import { icons } from './Icon.map';
import Wrapper from '../wrapper/Wrapper';

const { conditional } = ClassNameHelper;

function Icon(
  {
    icon,
    size = 'small',
    variant,
    margin = '0',
    className = '',
    hoverColor,
    disabled = false,
    error = false,
    customSize,
    mirrored,
    weight = 'regular',
    ...rest
  }: IconProps,
  ref: ForwardedRef<HTMLSpanElement>
) {
  const iconWrapperClasses = conditional({
    ['im-icon']: true,
    [`im-icon-${icon}`]: true,
    [`${className}`]: !!className,
  });

  const sizes = {
    tiny: '15px',
    small: '20px',
    medium: '25px',
    large: '30px',
    huge: '50px',
  };

  const props = {
    weight,
    size: sizes[size as keyof typeof sizes] as IconSize,
    mirrored,
  };

  return (
    <StyledIcon
      ref={ref}
      hoverColor={hoverColor}
      variant={variant}
      size={size}
      className={iconWrapperClasses}
      margin={margin}
      disabled={disabled}
      error={error}
      customSize={customSize}
      {...rest}
    >
      <Wrapper component={icons[`${icon}`]} props={props} />
    </StyledIcon>
  );
}

export default forwardRef(Icon);
