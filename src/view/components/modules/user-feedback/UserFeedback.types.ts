export type FeedbackType = 'error' | 'valid' | 'info' | 'warning' | 'question' | 'loading';

export type StyledUserFeedbackProps = { width?: string; height?: string; maxWidth?: string; maxHeight?: string };

export type UserFeedbackProps = StyledUserFeedbackProps & {
  variant: FeedbackType | undefined;
  message?: string;
  fontSize?: 'small' | 'medium' | 'large';
  className?: string;
};
