import { useTranslation } from 'react-i18next';
import StyledLoadingSpinner from './LoadingSpinner.styled';
import { LoadingSpinnerProps } from './LoadingSpinner.types';
import ImLogoAnimation from '../im-logo-animation/ImLogoAnimation';
import { ClassNameHelper } from '../../../../utils/helpers';

const { conditional } = ClassNameHelper;

export default function LoadingSpinner({ message, size = 'medium', className, condition }: LoadingSpinnerProps) {
  const { t } = useTranslation();

  const classes = conditional({
    ['im-loading-spinner']: true,
    [className as string]: !!className,
  });

  const messageRenderer = () => {
    if (typeof message === 'string') {
      return <div className="im-loading-spinner-message">{message}</div>;
    }
    if (message) {
      return <div className="im-loading-spinner-message">{t('Common.Loading')}</div>;
    }

    return null;
  };

  if (condition === false) {
    return null;
  }

  const sizeMap = {
    tiny: 'tiny',
    small: 'small',
    medium: 'medium',
    large: 'large',
  } as const;

  return (
    <StyledLoadingSpinner className={classes} data-testid="im-loading-spinner" size={size}>
      <ImLogoAnimation size={sizeMap[`${size}`]} />
      {messageRenderer()}
    </StyledLoadingSpinner>
  );
}
