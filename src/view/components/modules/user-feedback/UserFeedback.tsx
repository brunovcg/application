import { useMemo } from 'react';
import { MessageContainer, LoadingSpinner, Section } from '../..';
import StyledUserFeedback from './UserFeedback.styled';
import { UserFeedbackProps } from './UserFeedback.types';
import { ClassNameHelper } from '../../../../utils/helpers';

export default function UserFeedback({ variant, message, width, height, maxHeight, maxWidth, fontSize, className }: UserFeedbackProps) {
  const renderer = useMemo(() => {
    if (variant === 'loading') {
      return <LoadingSpinner message={message ?? true} size={fontSize} />;
    }
    if (message) {
      return <MessageContainer text={message} variant={variant} width="fit-content" fontSize={fontSize ?? 'medium'} bold />;
    }
    return null;
  }, [variant, message]);

  const classes = ClassNameHelper.conditional({
    ['im-user-feedback']: true,
    [String(className)]: !!className,
  });

  return (
    <StyledUserFeedback className={classes} width={width} height={height} maxHeight={maxHeight} maxWidth={maxWidth}>
      <Section width="100%" height="100%">
        {renderer}
      </Section>
    </StyledUserFeedback>
  );
}
