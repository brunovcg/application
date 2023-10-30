export type StyledLoadingSpinnerProps = {
  size: 'tiny' | 'small' | 'medium' | 'large';
};

export type LoadingSpinnerProps = {
  size?: 'tiny' | 'small' | 'medium' | 'large';
  message?: boolean | string;
  className?: string;
  condition?: boolean;
};
