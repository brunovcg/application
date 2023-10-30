import { Route, Routes } from 'react-router-dom';
import { useRoutes } from './useRoutes';
import { RouteObject } from './useRoutes.types';
import RouteGuard from './RouteGuard';

const routesHandler = (currentRoutes: RouteObject) => {
  const routesKeys = Object.keys(currentRoutes);
  return routesKeys.map((routeKey) => {
    const currentRoute = currentRoutes[routeKey as keyof typeof currentRoutes] ?? {};

    const index = !!currentRoute.index;

    return (
      <Route key={currentRoute.path} index={index as unknown as undefined} path={currentRoute.path} element={currentRoute.element}>
        {!!currentRoute.children && routesHandler(currentRoute.children)}
      </Route>
    );
  });
};

function Router() {
  const { routes } = useRoutes();

  return (
    <Routes>
      <Route element={<RouteGuard />}>{routesHandler(routes as unknown as RouteObject)}</Route>
    </Routes>
  );
}

export default Router;
