import { ClassNameHelper } from '../../../../utils/helpers';
import StyledErrorMessage from './ErrorMessage.styled';
import { ErrorMessageProps } from './ErrorMessage.types';

const { conditional } = ClassNameHelper;

export default function ErrorMessage({ error, className, width, hide = false, margin }: ErrorMessageProps) {
  const classes = conditional({
    ['im-error-message']: true,
    [className as string]: !!className,
  });

  if (hide) {
    return null;
  }

  return (
    <StyledErrorMessage width={width} className={classes} margin={margin} data-testid="im-error-message">
      <span>{error}</span>
    </StyledErrorMessage>
  );
}
