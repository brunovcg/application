import { RouteObject } from 'react-router-dom';
import { RouteNamesPaths } from './useRoutes.types';

const routerFunctions = {
  insertRoutesPath(routes: RouteObject) {
    const paths: { path: string }[] = [];
    const getDeepRoute = (currentRoute: RouteObject) => {
      const currentRouteKeys = Object.keys(currentRoute);

      currentRouteKeys.forEach((routeKey) => {
        const currentRouteValues = currentRoute[String(routeKey) as keyof typeof currentRoute];
        paths.push({ ...currentRouteValues, path: currentRouteValues.path });
        const childrenKeys = Object.keys(currentRouteValues.children ?? {});
        if (childrenKeys.length) {
          childrenKeys.forEach((childrenKey) => {
            if (currentRouteValues.children) {
              getDeepRoute({ [childrenKey]: currentRouteValues.children[String(childrenKey) as keyof typeof currentRouteValues.children] });
            }
          });
        }
      });
    };

    getDeepRoute(routes);

    return paths;
  },

  getRoutesPaths(routes: RouteObject) {
    let routeNamesPaths: RouteNamesPaths = {} as RouteNamesPaths;
    const getDeepRoute = (currentRoute: RouteObject) => {
      const currentRouteKeys = Object.keys(currentRoute);
      currentRouteKeys.forEach((routeKey) => {
        const currentRouteValues = currentRoute[String(routeKey) as keyof typeof currentRoute];
        const elementName = currentRouteValues.name;
        routeNamesPaths = { ...routeNamesPaths, [elementName as keyof typeof routeNamesPaths]: currentRouteValues.path };
        const childrenKeys = Object.keys(currentRouteValues.children ?? {});
        if (childrenKeys.length) {
          childrenKeys.forEach((childrenKey) => {
            if (currentRouteValues.children) {
              getDeepRoute({ [childrenKey]: currentRouteValues.children[String(childrenKey) as keyof typeof currentRouteValues.children] });
            }
          });
        }
      });
    };

    getDeepRoute(routes);

    return routeNamesPaths;
  },
};

export default routerFunctions;
