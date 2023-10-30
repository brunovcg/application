import { matchRoutes, useLocation } from 'react-router-dom';
import { RouteProps } from './useRoutes.types';
import { useRoutes } from './useRoutes';
import routerFunctions from './functions';
import { HandleRouteSearchArgs } from './useCurrentRoutes.types';
import useNavigation from '../utils/hooks/modules/use-navigation/useNavigation';

export const useCurrentRoute = () => {
  const { routes } = useRoutes();
  const location = useLocation();

  const mappedRoute = routerFunctions.insertRoutesPath(routes);
  const route = matchRoutes(mappedRoute, location);
  const { navigate } = useNavigation();

  const handleRouteSearch = (args?: HandleRouteSearchArgs) => {
    const search = location.search.replace('?', '').split('&');

    let mappedSearch = search.reduce((acc, current) => {
      const entries = current.split('=');

      if (!entries[0]) {
        return acc;
      }

      return { ...acc, [entries[0]]: entries[1] };
    }, {}) as Record<string, string>;

    if (args?.update) {
      const { update } = args;
      const keysToUpdate = Object.keys(update);
      keysToUpdate.forEach((key) => (mappedSearch[`${key}`] = update?.[`${key}`] as string));
    }

    if (args?.remove) {
      const { remove } = args;
      if (remove === 'all') {
        mappedSearch = {};
      } else {
        remove.forEach((key) => Reflect.deleteProperty(mappedSearch, key));
      }
    }

    if (args?.add) {
      const { add } = args;
      const entriesToAdd = Object.keys(add);

      entriesToAdd.forEach((key) => (mappedSearch[`${key}`] = add[`${key}`]));
    }

    const updatedKeys = Object.keys(mappedSearch);

    if (!updatedKeys.length) {
      return navigate({ path: location.pathname });
    }

    const updatedSearch = updatedKeys.reduce((acc, currentKey) => {
      const entrySearch = `${currentKey}=${mappedSearch[currentKey as keyof typeof mappedSearch]}`;

      if (!acc) {
        return entrySearch;
      }
      return acc + `&${entrySearch}`;
    }, '');

    navigate({ path: location.pathname, search: `?${updatedSearch}` });
  };

  const getRouteSearch = () => {
    const search = window.location.search.replace('?', '');

    const parts = search.split('&');

    if (parts.length === 1 && !parts[0]) {
      return {};
    }

    return parts.reduce((acc, next) => {
      const param = next.split('=');
      acc[param[0]] = param[1];
      return acc;
    }, {} as Record<string, string>);
  };

  const currentRoute = route?.[0].route as RouteProps;

  return { currentRoute, getRouteSearch, handleRouteSearch };
};
