import StyledDashboard from './Dashboard.styled';
import { Outlet } from 'react-router-dom';
import Drawer from './components/drawer/Drawer';
import { ButtonIcon, Title, Portal } from '../../components';
import { useCurrentRoute } from '../../../router/useCurrentRoute';
import { useRoutes } from '../../../router/useRoutes';
import { useDevice } from '../../../utils/hooks';
import { useEffect, useRef, useState } from 'react';

export default function Dashboard() {
  const { currentRoute } = useCurrentRoute();
  const { routesPaths } = useRoutes();
  const { isMobile } = useDevice();
  const [showDrawer, setShowDrawer] = useState(!isMobile);

  const renderTitle = () => {
    if (currentRoute.path !== routesPaths.home) {
      return (
        <Title
          icon={currentRoute.data?.icon}
          text={currentRoute?.data?.text ?? ''}
          size="regular"
          variant="primary-dark"
          marginBottom="30px"
        />
      );
    }
    return null;
  };

  const hideDrawer = () => setShowDrawer(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const mobileDrawerButton = (
    <ButtonIcon
      ref={menuRef}
      icon={showDrawer ? 'close' : 'menu'}
      className="im-mobile-drawer-button"
      variant="primary"
      onClick={() => setShowDrawer((state) => !state)}
      showBorder
    />
  );

  useEffect(() => {
    if (!isMobile) {
      setShowDrawer(true);
    }
  }, [isMobile]);

  return (
    <StyledDashboard className="im-dashboard">
      {showDrawer && <Drawer hideDrawer={hideDrawer} menuRef={menuRef} />}
      {isMobile && <Portal element={mobileDrawerButton} targetId="im-mobile-header-menu" />}
      <div className="im-dashboard-content">
        {renderTitle()}
        <Outlet />
        <div id="im-dashboard-content-buttons" />
      </div>
    </StyledDashboard>
  );
}
