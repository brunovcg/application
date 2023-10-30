import { ReactNode } from 'react';

export type PortalProps = {
  element: ReactNode;
  className?: string;
  targetId: string;
};
