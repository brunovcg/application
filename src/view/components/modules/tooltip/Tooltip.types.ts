import { ReactElement, ReactNode } from 'react';
import { PopperSide } from '../../../../utils/hooks/modules/use-popper/usePopper.types';

export type StyledTooltipProps = {
  help?: boolean;
  autoEllipsis?: boolean;
};
export type StyledTooltipContentProps = {
  zIndex: number;
};

export type TooltipProps = StyledTooltipProps & {
  content: string | ReactNode;
  trigger: ReactElement | ReactNode;
  delay?: number;
  side?: PopperSide;
  enabled?: boolean;
};
