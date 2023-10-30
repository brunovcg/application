import { useState, useRef, useMemo, useCallback, useContext } from 'react';
import StyledDrawer from './Drawer.styled';
import { ButtonIcon, Icon, Tooltip } from '../../../../components';
import { useDevice, useOnClickOutside, useTranslationPath } from '../../../../../utils/hooks';
import { DataHelper, ClassNameHelper } from '../../../../../utils/helpers';
import { useRoutes } from '../../../../../router/useRoutes';
import { useCurrentRoute } from '../../../../../router/useCurrentRoute';
import { useTranslation } from 'react-i18next';
import { DrawerProps } from './Drawer.types';
import useNavigation from '../../../../../utils/hooks/modules/use-navigation/useNavigation';
import { UserSessionContext } from '../../../../../contexts/modules/user-session/UserSessionContext';

const { filterMap } = DataHelper;

function Drawer({ hideDrawer, menuRef }: DrawerProps) {
  const { isMobile } = useDevice();
  const { routes } = useRoutes();
  const { t } = useTranslation();
  const drawerPath = useTranslationPath('Pages.Dashboard.Drawer');
  const { sessionUser } = useContext(UserSessionContext);

  const [isCollapsedDrawer, setIsCollapsedDrawer] = useState(false);
  const { currentRoute } = useCurrentRoute();

  const handleCollapseDrawer = () => {
    setIsCollapsedDrawer((state) => !state);
  };

  const { navigate } = useNavigation();

  const drawerRef = useRef<HTMLDivElement>(null);

  const icon = { type: isCollapsedDrawer ? ('arrowForward' as const) : ('arrowBack' as const) };

  const drawerClasses = ClassNameHelper.conditional({
    'im-drawer': true,
    'im-collapsed': isCollapsedDrawer,
    'im-drawer-mobile': isMobile,
  });

  const menuOptionsClasses = useCallback(
    (path: string) =>
      ClassNameHelper.conditional({
        'im-drawer-menu-option': true,
        'im-selected': currentRoute.path === path,
      }),
    [currentRoute.path]
  );

  useOnClickOutside([drawerRef, menuRef], hideDrawer, isMobile);

  const memoizedMenu = useMemo(() => Object.values(routes?.dashboard?.children ?? {}), [routes?.dashboard?.children]);

  const optionRenderer = useMemo(
    () =>
      filterMap(
        memoizedMenu,
        (item) => item.active && !!item.permission,
        (item) => (
          <Tooltip
            key={item.name}
            content={item.data.text}
            side="right"
            trigger={
              <button
                className={menuOptionsClasses(item.path)}
                onClick={() => {
                  if (isMobile) {
                    hideDrawer();
                  }
                  if (sessionUser.isSessionBlocked) return;
                  navigate({ routeName: item.name });
                }}
              >
                {item.data.icon && <Icon size="medium" icon={item.data.icon} />}
                <div className="im-drawer-menu-option-text">{item.data.text}</div>
              </button>
            }
          />
        )
      ),
    [memoizedMenu, menuOptionsClasses]
  );

  return (
    <StyledDrawer className={drawerClasses} ref={drawerRef}>
      {!isMobile && (
        <ButtonIcon
          className="im-drawer-button-icon"
          variant="medium"
          iconWeight="bold"
          icon={icon.type}
          onClick={handleCollapseDrawer}
          size="medium"
          margin="0.5px 1px 0 0"
        />
      )}
      <h3 className="im-drawer-title">{t(drawerPath('Title'))}</h3>
      <section className="im-drawer-menu">{optionRenderer}</section>
    </StyledDrawer>
  );
}

export default Drawer;
