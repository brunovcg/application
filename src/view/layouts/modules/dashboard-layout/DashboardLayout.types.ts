import { UseTabsModules } from '../../../../utils/hooks/modules/use-tabs/useTabs.types';

export type DashboardLayoutProps = {
  modules: UseTabsModules;
};

export type DashboardLayoutTabRef<ModuleName extends string> = {
  selectTab: (tabName: ModuleName) => void;
};
