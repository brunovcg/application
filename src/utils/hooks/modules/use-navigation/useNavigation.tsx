import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRoutes } from '../../../../router/useRoutes';
import { NavigateArgs } from './useNavigation.types';
import { UserSessionContext } from '../../../../contexts/modules/user-session/UserSessionContext';

export default function useNavigation() {
  const reactRouterNavigate = useNavigate();
  const { sessionUser } = useContext(UserSessionContext);
  const { routesPaths } = useRoutes();

  const navigate = ({ routeName, path, search, params }: NavigateArgs) => {
    if (sessionUser?.isSessionBlocked) return;

    const configsRoute = () => {
      const routePath = routesPaths[routeName as keyof typeof routesPaths];

      if (params) {
        const regex = /:(.*?)(?=\/|$)/g;
        let url = routePath;
        const mappedParams = routePath.match(regex) ?? [];
        mappedParams.forEach((item) => (url = url.replace(item, params[item.substring(1, item.length)])));
        return url;
      }

      return routePath;
    };

    if (routeName) {
      reactRouterNavigate(configsRoute() + (search ?? ''));
    } else if (path) {
      reactRouterNavigate(path + (search ?? ''));
    }
  };

  return { navigate };
}
