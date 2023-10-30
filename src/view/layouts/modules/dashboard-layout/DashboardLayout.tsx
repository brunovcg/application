import { useTabs } from '../../../../utils/hooks';
import { DashboardLayoutProps, DashboardLayoutTabRef } from './DashboardLayout.types';
import './DashboardLayout.scss';
import { ForwardedRef, forwardRef, useImperativeHandle } from 'react';
import { UseTabsModules } from '../../../../utils/hooks/modules/use-tabs/useTabs.types';

function DashboardLayout({ modules }: DashboardLayoutProps, ref?: ForwardedRef<DashboardLayoutTabRef<UseTabsModules[number]['name']>>) {
  const { tabsRenderer, tabContainerRenderer, selectTab } = useTabs({
    modules,
    tabContainerSize: { height: '100%' },
  });

  useImperativeHandle(ref, () => ({ selectTab }));

  return (
    <div className="im-dashboard-layout">
      {tabsRenderer}
      <div className="im-dashboard-layout-content"> {tabContainerRenderer}</div>
      <div id="im-dashboard-footer" />
    </div>
  );
}

export default forwardRef(DashboardLayout);
