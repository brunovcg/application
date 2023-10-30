import StyledButton from './Button.styled';
import { ButtonProps } from './Button.types';
import { ForwardedRef, forwardRef, MouseEvent } from 'react';
import Icon from '../icon/Icon';
import LoadingSpinner from '../loading-spinner/LoadingSpinner';
import { ClassNameHelper } from '../../../../utils/helpers';
import { IconProps } from '../icon/Icon.types';
import { useTranslation } from 'react-i18next';
import { Portal } from '../..';

function Button(
  {
    usePortal,
    text,
    variant = 'primary',
    onClick,
    href,
    width,
    height,
    disabled = false,
    type,
    icon,
    onSubmitCapture,
    customIcon,
    loading,
    className,
    stopPropagation,
    preventDefault,
    textNoWrap,
    small,
    dataTestId,
    flexGrow,
    styling = 'outlined',
    ...rest
  }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const iconProps = customIcon ?? {
    icon,
    size: small ? 'tiny' : 'small',
  };

  const { t } = useTranslation();

  const regularComponent = (
    <>
      {(icon || customIcon) && <Icon {...(iconProps as IconProps)} />}
      <span className="im-button-text">{text}</span>
    </>
  );

  const loadingComponent = (
    <div className="im-button-loading">
      <LoadingSpinner size="tiny" className="im-button-loading-icon" />{' '}
      <span className="im-button-loading-text">{t('Common.Loading')}</span>
    </div>
  );

  const classes = ClassNameHelper.conditional({
    ['im-button']: true,
    ['im-loading']: loading,
    [className as string]: !!className,
  });

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      return;
    }

    if (stopPropagation) {
      e?.stopPropagation();
    }
    if (preventDefault) {
      e?.preventDefault();
    }

    onClick?.(e);
  };

  const buttonRenderer = (
    <button
      ref={ref}
      onClick={handleClick}
      type={type}
      className="im-button-element"
      data-testid={dataTestId}
      onSubmitCapture={onSubmitCapture}
    >
      {loading ? loadingComponent : regularComponent}
    </button>
  );

  const componentRenderer = (
    <StyledButton
      className={classes}
      disabled={disabled || loading}
      variant={variant}
      height={height}
      width={width}
      small={small}
      styling={styling}
      textNoWrap={textNoWrap}
      flexGrow={flexGrow}
      {...rest}
    >
      {!href && buttonRenderer}
      {!!href && (
        <a href={href} target="_blank" rel="noreferrer">
          {buttonRenderer}
        </a>
      )}
    </StyledButton>
  );

  if (usePortal === '') {
    return null;
  }

  return (
    <>
      {!usePortal && componentRenderer} {!!usePortal && <Portal element={componentRenderer} targetId={usePortal} />}
    </>
  );
}

export default forwardRef(Button);
