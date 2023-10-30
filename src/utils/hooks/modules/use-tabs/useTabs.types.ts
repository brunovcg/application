import { ReactNode } from 'react';

type UseTabsModule = {
  name: string;
  component: ReactNode;
  hide?: boolean;
};

export type UseTabsModules = UseTabsModule[];

export type StyledTabContainerRendererProps = { width?: string; height?: string };

export type UseTabsProps = {
  modules: UseTabsModules;
  tabContainerSize?: StyledTabContainerRendererProps;
  tabsClassName?: string;
  tabsContainerClassName?: string;
  initialSelection?: string;
};
