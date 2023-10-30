import { useTranslation } from 'react-i18next';
import { Container, Divider, Icon, ImLogo, InputText, MessageContainer, Section } from '../../../../../../components';
import StyledInternalUserHome from './InternalUserHome.styled';
import { useTranslationPath } from '../../../../../../../utils/hooks';
import { useRoutes } from '../../../../../../../router/useRoutes';
import { useMemo, useState } from 'react';
import { DataHelper } from '../../../../../../../utils/helpers';
import useNavigation from '../../../../../../../utils/hooks/modules/use-navigation/useNavigation';

const { filterMap } = DataHelper;

export default function InternalUserHome() {
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.Home');
  const { routes, routesPaths } = useRoutes();
  const { navigate } = useNavigation();
  const [filtered, setFiltered] = useState('');

  const memoizedMenu = useMemo(
    () => [...Object.values(routes?.dashboard?.children ?? {}), ...Object.values(routes?.content?.children ?? {})],
    [routes?.dashboard?.children]
  );

  const optionsRenderer = useMemo(
    () =>
      filterMap(
        memoizedMenu,
        (item) =>
          item.active &&
          !!item.permission &&
          item.path !== routesPaths.home &&
          filtered.split(' ').some((word) => item.data?.description?.toLowerCase().includes(word.toLowerCase())),
        (item) => (
          <Container key={item.path} onClick={() => navigate({ routeName: item.name })} className="im-internal-user-home-module">
            <div className="im-module-name">
              {item?.data?.icon && <Icon size="huge" icon={item.data.icon} />}
              <div>{item?.data?.text ?? ''}</div>
            </div>
            <div className="im-module-description">{item?.data?.description ?? ''}</div>
          </Container>
        )
      ),
    [memoizedMenu, filtered]
  );

  const renderer = () => {
    if (optionsRenderer.length) {
      return optionsRenderer;
    }
    return <MessageContainer text={t(path('NoData'))} variant="error" fontSize="medium" width="fit-content" />;
  };

  return (
    <StyledInternalUserHome className="im-internal-user-home">
      <div className="im-internal-user-home-logo-wrapper">
        <ImLogo size="huge" />
        <Divider margin="3px 0" width="200px" variant="primary" />
        <p className="im-internal-user-home-slogan">{t(path('BetterLead'))}</p>
      </div>

      <div className="im-internal-user-home-user-search">
        <div className="im-internal-user-home-second-line">
          <InputText width="250px" onChange={setFiltered} debounce={300} placeholder={t('Common.Search')} showError={false} />
        </div>
      </div>
      <Section contentClassName="im-internal-user-home-module-content">{renderer()}</Section>
    </StyledInternalUserHome>
  );
}
