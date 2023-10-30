import { CSSProperties, MouseEvent, ReactNode } from 'react';
import Constants from '../../../../utils/constants/Constants';

const { BACKGROUND_COLORS } = Constants;

export const containerVariants = ['white', 'light', 'regular', 'transparent'] as const;

export const containerClasses = ['im-disabled', 'im-errored', 'im-warning', 'im-hoverable', 'im-focused', 'im-valid', 'im-primary'];

export type ContainerVariants = keyof typeof BACKGROUND_COLORS;

export type StyledContainerProps = {
  variant?: ContainerVariants;
  height?: string;
  overflowX?: { maxWidth: string };
  overflowY?: { maxHeight: string };
};

export type StyledWrapperProps = { width?: string };

export type ContainerProps = StyledWrapperProps &
  StyledContainerProps & {
    label?: string | ReactNode;
    children: ReactNode;
    className?: string;
    warning?: boolean;
    valid?: boolean;
    disabled?: boolean;
    error?: boolean;
    primary?: boolean;
    hoverable?: boolean;
    focus?: boolean;
    htmlFor?: string;
    onClick?: (e: MouseEvent<HTMLDivElement>) => void;
    optionalLabel?: boolean;
    requiredLabel?: boolean;
    errorMessage?: string;
    showError?: boolean;
    style?: CSSProperties;
    dataTestId?: string;
    noBorder?: boolean;
    onLabelClick?: (e: MouseEvent<HTMLDivElement>) => void;
  };
