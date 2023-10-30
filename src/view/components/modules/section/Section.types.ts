import { ReactNode } from 'react';
import { IconName } from '../icon/Icon.types';

export type StyledSectionProps = {
  height?: string;
  width?: string;
  maxHeight?: string;
  maxWidth?: string;
  minHeight?: string;
  sectionTitle?: string;
};

export type SectionProps = StyledSectionProps & {
  children: ReactNode;
  className?: string;
  icon?: IconName;
  contentClassName?: string;
  description?: ReactNode;
};
