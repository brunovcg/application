import { StyledContentMenuItem, StyledHeader } from './Header.styled';
import { ImLogo, Avatar, Icon, DropdownMenu, ButtonIcon } from '../../../components';
import { useTranslation } from 'react-i18next';
import { useRoutes } from '../../../../router/useRoutes';
import { ReactNode, useContext, useEffect, useState } from 'react';
import { ClassNameHelper, DOMHelper } from '../../../../utils/helpers';
import { useCurrentRoute } from '../../../../router/useCurrentRoute';
import { useDevice } from '../../../../utils/hooks';
import useHeaderPermissions from './Header.permissions';
import { RouteProps } from '../../../../router/useRoutes.types';
import { DropdownOptions } from '../../../components/modules/dropdown-menu/DropdownMenu.types';
import { BackgroundVariant, ColorsVariant } from '../../../../types';
import useNavigation from '../../../../utils/hooks/modules/use-navigation/useNavigation';
import { HeaderExternalLink } from './Header.types';
import { ServicesEndpointsConfigs } from '../../../../configs';
import { UserSessionContext } from '../../../../contexts/modules/user-session/UserSessionContext';
import { DialogsContext } from '../../../../contexts/modules/dialogs/DialogsContext';

export default function Header() {
  const permissions = useHeaderPermissions();
  const { t } = useTranslation();
  const { isMobile } = useDevice();
  const { routes } = useRoutes();
  const { sessionUser, signOut } = useContext(UserSessionContext);
  const { openDialog } = useContext(DialogsContext);
  const [showMobileMenu, setShowMobileMenu] = useState(isMobile);

  useEffect(() => {
    if (isMobile) {
      setShowMobileMenu(true);
    }
  }, [isMobile]);

  const { navigate } = useNavigation();

  const { currentRoute } = useCurrentRoute();

  const headerMenu = Object.values(routes?.content?.children ?? {});

  const contentItemClasses = (item: RouteProps) =>
    ClassNameHelper.conditional({
      'im-content-option': true,
      'im-selected': currentRoute.path === item.path,
    });

  const handleDropdownColors = (path: string): { selectedBackground?: BackgroundVariant; textVariant?: ColorsVariant } => {
    const selected = currentRoute.path === path;
    if (selected) {
      return { selectedBackground: 'primary', textVariant: 'white' };
    }
    return { selectedBackground: undefined, textVariant: 'medium' };
  };

  const headerExternalLink: HeaderExternalLink = [
    {
      path: ServicesEndpointsConfigs.facebookLinks.group,
      active: true,
      permission: true,
      data: { icon: 'facebook', text: t('Layout.Header.Links.Community') },
    },
    {
      data: { icon: 'facebook', text: t('Layout.Header.Links.Events') },
      path: ServicesEndpointsConfigs.facebookLinks.events,
      active: true,
      permission: true,
    },
  ];

  const contentMenu = [...headerMenu, ...headerExternalLink].reduce(
    (acc, current) => {
      const { data, permission, active, path, name } = current ?? {};
      const { text, icon } = data ?? {};

      const handleClick = () => {
        if (name) {
          navigate({ routeName: name });
        } else {
          DOMHelper.openLink(path);
        }
      };

      if (active && permission) {
        acc.mobile.push({
          selected: currentRoute.path === path,
          text: text as string,
          icon,
          onClick: handleClick,
          selectedBackground: handleDropdownColors(path).selectedBackground,
          textVariant: handleDropdownColors(path).textVariant,
        });
        acc.desktop.push(
          <StyledContentMenuItem key={path}>
            <div className={contentItemClasses(current as RouteProps)} onClick={handleClick}>
              {icon && <Icon size="small" icon={icon} />}
              <div className="im-content-menu-option-text">{text}</div>
            </div>
          </StyledContentMenuItem>
        );
      }

      return acc;
    },
    { mobile: [], desktop: [] } as {
      mobile: DropdownOptions;
      desktop: ReactNode[];
    }
  );

  const effectiveUser = sessionUser?.name ?? sessionUser?.username;

  const userDropDownOptions: DropdownOptions = [
    {
      icon: 'user',
      text: t('Layout.Header.UserMenu.MyAccount'),
      onClick: () => openDialog({ id: 'UserAccountDialog', props: { instance: 'myAccount' } }),
      hoverVariant: 'hoverDark',
    },
    {
      icon: 'security',
      text: t('Layout.Header.UserMenu.Security'),
      onClick: () => openDialog({ id: 'AccountSecurityDialog', props: {} }),
      hoverVariant: 'hoverDark',
    },
    { icon: 'logout', hoverVariant: 'error', text: t('Common.Logout'), onClick: signOut },
  ];

  if (!permissions.renderHeader) {
    return null;
  }

  return (
    <StyledHeader className="im-header">
      <div className="im-header-right-panel">
        {showMobileMenu && <div id="im-mobile-header-menu" />}
        <ImLogo size="tiny" />
      </div>

      <div className="im-header-left-panel">
        {!isMobile && permissions.displayNavMenu && <nav className="im-header-nav">{contentMenu.desktop}</nav>}
        {isMobile && permissions.displayNavMenu && (
          <DropdownMenu options={contentMenu.mobile} trigger={<ButtonIcon icon="feed" variant="primary" />} skidding={-60} />
        )}

        {permissions.displayAvatarMenu && (
          <DropdownMenu
            trigger={<Avatar username={sessionUser.username} name={sessionUser.name} size="small" />}
            options={userDropDownOptions}
            title={effectiveUser}
            skidding={-60}
          />
        )}
      </div>
    </StyledHeader>
  );
}
