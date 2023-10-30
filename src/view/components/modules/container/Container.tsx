import { forwardRef, ForwardedRef } from 'react';
import { StyledContainer, StyledWrapper } from './Container.styled';
import { ContainerProps } from './Container.types';
import { ClassNameHelper } from '../../../../utils/helpers';
import { useTranslation } from 'react-i18next';
import ErrorMessage from '../error-message/ErrorMessage';

function Container(
  {
    label,
    variant,
    disabled = false,
    error = false,
    warning = false,
    primary = false,
    valid = false,
    hoverable,
    focus,
    noBorder,
    className,
    children,
    htmlFor,
    onClick,
    width,
    height,
    overflowX,
    overflowY,
    optionalLabel,
    errorMessage,
    requiredLabel,
    showError = false,
    style,
    dataTestId,
    onLabelClick,
    ...rest
  }: ContainerProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const { t } = useTranslation();
  const classesContainer = ClassNameHelper.conditional({
    ['im-container']: true,
    ['im-disabled']: disabled,
    ['im-errored']: error,
    ['im-warning']: warning,
    ['im-hoverable']: hoverable,
    ['im-focused']: focus,
    ['im-valid']: valid,
    ['im-primary']: primary,
    ['im-no-border']: noBorder,
    [`${className}`]: !!className,
  });

  const labelRenderer = () => {
    if (!label) {
      return null;
    }

    if (requiredLabel) {
      return (
        <label htmlFor={htmlFor} className="im-label-container-label">
          {label}
          {label && <>&nbsp;</>}
          {<span className="im-required">*</span>}
        </label>
      );
    }

    if (optionalLabel) {
      return (
        <label htmlFor={htmlFor} className="im-label-container-label">
          {label}
          {label && <>&nbsp;</>}
          {t('Components.Container.Optional')}
        </label>
      );
    }

    return <span className="im-label-container-label">{label}</span>;
  };

  return (
    <StyledWrapper className="im-container-wrapper" width={width}>
      <StyledContainer
        {...rest}
        variant={variant}
        className={classesContainer}
        ref={ref}
        onClick={onClick}
        height={height}
        overflowX={overflowX}
        overflowY={overflowY}
        style={style}
        data-testid={dataTestId}
      >
        {children}
        {(label || optionalLabel) && (
          <div className="im-container-label-wrapper" onClick={onLabelClick}>
            {labelRenderer()}
          </div>
        )}
      </StyledContainer>
      {showError && (
        <div className="im-container-error">
          <ErrorMessage error={errorMessage} />
        </div>
      )}
    </StyledWrapper>
  );
}

export default forwardRef(Container);
