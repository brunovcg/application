import { Icon, Container } from '../..';
import { MessageContainerProps, MessageContainerVariants } from './MessageContainer.types';
import { ClassNameHelper } from '../../../../utils/helpers';
import StyledMessageContainer from './MessageContainer.styled';

const { conditional } = ClassNameHelper;

export default function MessageContainer({
  text,
  variant = 'question',
  className,
  width = '100%',
  maxWidth,
  fontSize,
  smallPadding,
  bold = false,
}: MessageContainerProps) {
  const icon = {
    info: 'info',
    valid: 'done',
    warning: 'warning',
    error: 'cancel',
    question: 'question',
  } as const;

  const isError = variant === 'error';
  const isValid = variant === 'valid';
  const isWarning = variant === 'warning';
  const isInfo = variant === 'info';
  const isQuestion = variant === 'question';

  const classes = conditional({
    ['im-container-info']: true,
    ['im-valid']: isValid,
    ['im-info']: isInfo,
    ['im-warning']: isWarning,
    ['im-error']: isError,
    ['im-question']: isQuestion,
    [String(className)]: !!className,
  });

  const handleFontSize = () => {
    const sizes = {
      small: '12px',
      medium: '15px',
      large: '20px',
    };

    return sizes[(fontSize as keyof typeof sizes) ?? 'small'];
  };

  return (
    <StyledMessageContainer
      className="im-message-container"
      width={width}
      maxWidth={maxWidth}
      fontSize={handleFontSize()}
      smallPadding={smallPadding}
      bold={bold}
      isSmall={fontSize === 'small'}
    >
      <Container className={classes} variant="light" error={isError} valid={isValid} warning={isWarning} primary={isQuestion}>
        <div className="im-container-info-icon">
          <Icon icon={icon[String(variant) as MessageContainerVariants]} size={fontSize} weight="bold" />
        </div>
        <div className="im-container-info-text">{text}</div>
      </Container>
    </StyledMessageContainer>
  );
}
