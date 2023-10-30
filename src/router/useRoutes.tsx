import Dashboard from '../view/pages/dashboard/Dashboard';
import Login from '../view/pages/login/Login';
import NotFound from '../view/pages/not-found/NotFound';
import Home from '../view/pages/dashboard/modules/home/Home';
import AccessControl from '../view/pages/dashboard/modules/access-control/AccessControl';
import BuyBox from '../view/pages/dashboard/modules/buy-box/BuyBox';
import { useContext, useMemo } from 'react';
import { RouteObject } from './useRoutes.types';
import { useTranslation } from 'react-i18next';
import { useTranslationPath } from '../utils/hooks';
import AddressLookup from '../view/pages/dashboard/modules/address-lookup/AddressLookup';
import MyLeads from '../view/pages/dashboard/modules/my-leads/MyLeads';
import Partners from '../view/pages/content/partners/Partners';
import InputResults from '../view/pages/dashboard/modules/input-results/InputResults';
import Support from '../view/pages/dashboard/modules/support/Support';
import Products from '../view/pages/content/products/Products';
import routerFunctions from './functions';
import CreatePassword from '../view/pages/password/create-password/CreatePassword';
import useRoutesPermissions from './useRoutesPermissions';
import ForgotPassword from '../view/pages/password/forgot-password/ForgotPassword';
import Orders from '../view/pages/dashboard/modules/orders/Orders';
import QualityAssurance from '../view/pages/dashboard/modules/quality-assurance/QualityAssurance';
import Motivations from '../view/pages/dashboard/modules/motivations/Motivations';
import ProcessRunner from '../view/pages/dashboard/modules/process-runner/ProcessRunner';
import { UserSessionContext } from '../contexts/modules/user-session/UserSessionContext';
import AdAudience from '../view/pages/dashboard/modules/ad-audience/AdAudience';
import ScalingSystemGroup from '../view/pages/scaling-system/modules/scaling-system-group/ScalingSystemGroup';
import ScalingSystemSession from '../view/pages/scaling-system/modules/scaling-system-session/ScalingSystemSession';
import { FeatureFlags } from '../configs';

export const useRoutes = () => {
  const { sessionUser } = useContext(UserSessionContext);
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.Drawer.Modules');
  const scalingSystem = useTranslationPath('Pages.ScalingSystem');
  const description = useTranslationPath('Pages.Dashboard.Drawer.Modules.Descriptions');

  const dashboardPath = '/dashboard';

  const routesPermissions = useRoutesPermissions();

  const routes: RouteObject = useMemo(
    () => ({
      dashboard: {
        path: 'dashboard',
        name: 'dashboard',
        active: FeatureFlags.modules.dashboard,
        element: <Dashboard />,
        fallbackPath: '/',
        permission: routesPermissions.dashboard,
        data: {},
        children: {
          home: {
            path: dashboardPath,
            name: 'home',
            fallbackPath: '/',
            permission: routesPermissions.dashboard,
            index: FeatureFlags.modules.home,
            element: <Home />,
            active: FeatureFlags.modules.home,
            data: { icon: 'home', text: t(path('Home')) },
          },
          addressLookup: {
            path: '/dashboard/address-lookup',
            name: 'addressLookup',
            permission: routesPermissions.addressLookup,
            fallbackPath: dashboardPath,
            element: <AddressLookup />,
            active: FeatureFlags.modules.addressLookup,
            data: { icon: 'searchList', text: t(path('AddressLookup')), description: t(description('AddressLookup')) },
          },
          buyBox: {
            path: '/dashboard/buy-box',
            name: 'buyBox',
            permission: routesPermissions.buyBox,
            fallbackPath: dashboardPath,
            element: <BuyBox />,
            active: FeatureFlags.modules.buyBox,
            data: { icon: 'userSettings', text: t(path('BuyBox')), description: t(description('BuyBox')) },
          },
          processRunner: {
            path: '/dashboard/process-runner',
            name: 'processRunner',
            permission: routesPermissions.processRunner,
            fallbackPath: dashboardPath,
            element: <ProcessRunner />,
            active: FeatureFlags.modules.processRunner,
            data: { icon: 'play', text: t(path('ProcessRunner')), description: t(description('ProcessRunner')) },
          },
          motivations: {
            path: '/dashboard/motivations',
            name: 'motivations',
            permission: routesPermissions.motivations,
            fallbackPath: dashboardPath,
            element: <Motivations />,
            active: FeatureFlags.modules.motivations,
            data: { icon: 'chartHorizontal', text: t(path('Motivations')), description: t(description('Motivations')) },
          },
          adAudience: {
            path: '/dashboard/ad-audience',
            name: 'adAudience',
            permission: routesPermissions.adAudience,
            fallbackPath: dashboardPath,
            element: <AdAudience />,
            active: FeatureFlags.modules.adAudience,
            data: { icon: 'ad', text: t(path('AdAudience')), description: t(description('AdAudience')) },
          },
          inputResults: {
            path: '/dashboard/input-results',
            name: 'inputResults',
            permission: routesPermissions.inputResults,
            fallbackPath: dashboardPath,
            element: <InputResults />,
            active: FeatureFlags.modules.inputResults,
            data: {
              icon: 'payment',
              text: t(path('InputResults')),
              description: t(description('InputResults')),
            },
          },
          myLeads: {
            path: '/dashboard/my-leads',
            name: 'myLeads',
            permission: routesPermissions.myLeads,
            fallbackPath: dashboardPath,
            element: <MyLeads />,
            active: FeatureFlags.modules.myLeads,
            data: { icon: 'mail', text: t(path('MyLeads')), description: t(description('MyLeads')) },
          },
          orders: {
            path: '/dashboard/orders',
            name: 'orders',
            permission: routesPermissions.orders,
            fallbackPath: dashboardPath,
            element: <Orders />,
            active: FeatureFlags.modules.orders,
            data: { icon: 'order', text: t(path('Orders')), description: t(description('Orders')) },
          },
          qualityAssurance: {
            path: '/dashboard/quality-assurance',
            name: 'qualityAssurance',
            element: <QualityAssurance />,
            permission: routesPermissions.qualityAssurance,
            fallbackPath: dashboardPath,
            active: FeatureFlags.modules.qualityAssurance,
            data: { icon: 'quality', text: t(path('QualityAssurance')), description: t(description('AccessControl')) },
          },
          accessControl: {
            path: '/dashboard/access-control',
            name: 'accessControl',
            element: <AccessControl />,
            permission: routesPermissions.accessControl,
            fallbackPath: dashboardPath,
            active: true,
            data: { icon: 'lock', text: t(path('AccessControl')), description: t(description('AccessControl')) },
          },
          support: {
            path: '/dashboard/support',
            name: 'support',
            element: <Support />,
            permission: routesPermissions.support,
            fallbackPath: dashboardPath,
            active: FeatureFlags.modules.support,
            data: { icon: 'question', text: t(path('Support')) },
          },
        },
      },
      content: {
        path: 'content',
        name: 'content',
        active: FeatureFlags.modules.content,
        element: <Dashboard />,
        fallbackPath: '/',
        permission: routesPermissions.content,
        data: {},
        children: {
          products: {
            path: '/content/products',
            name: 'products',
            fallbackPath: dashboardPath,
            element: <Products />,
            active: FeatureFlags.modules.products,
            permission: routesPermissions.content,
            data: { icon: 'product', text: t(path('Products')), description: t(description('Products')) },
          },
          partners: {
            path: '/content/partners',
            name: 'partners',
            fallbackPath: dashboardPath,
            element: <Partners />,
            active: FeatureFlags.modules.partners,
            permission: routesPermissions.content,
            data: { icon: 'partners', text: t(path('Partners')), description: t(description('Partners')) },
          },
        },
      },
      scalingSystem: {
        path: '/scaling-system',
        fallbackPath: '/',
        name: 'scalingSystem',
        active: FeatureFlags.modules.scalingSystem,
        element: <Dashboard />,
        permission: routesPermissions.content,
        data: {},
        children: {
          scalingSystemGroup: {
            path: '/scaling-system/group/:group',
            name: 'scalingSystemGroup',
            fallbackPath: dashboardPath,
            element: <ScalingSystemGroup />,
            active: FeatureFlags.modules.scalingSystemGroup,
            permission: routesPermissions.content,
            data: { text: t(scalingSystem('Title')), icon: 'scale' },
          },
          scalingSystemSession: {
            path: '/scaling-system/group/:group/session/:session/category/:category',
            name: 'scalingSystemSession',
            fallbackPath: dashboardPath,
            element: <ScalingSystemSession />,
            active: FeatureFlags.modules.scalingSystemSession,
            permission: routesPermissions.content,
            data: { text: t(scalingSystem('Title')), icon: 'scale' },
          },
        },
      },
      login: {
        path: '/',
        name: 'login',
        element: <Login />,
        active: FeatureFlags.modules.login,
        data: {},
      },
      forgotPassword: {
        path: 'forgot-password',
        name: 'forgotPassword',
        active: FeatureFlags.modules.forgotPassword,
        element: <ForgotPassword />,
        data: {},
      },
      createPassword: {
        path: 'create-password',
        name: 'createPassword',
        active: FeatureFlags.modules.createPassword,
        element: <CreatePassword />,
        data: {},
      },
      notFound: { path: '*', name: 'notFound', element: <NotFound />, active: FeatureFlags.modules.notFound, data: {} },
    }),
    [sessionUser, routesPermissions]
  );

  const routesPaths = useMemo(() => routerFunctions.getRoutesPaths(routes), [routes]);

  return { routes, routesPaths };
};
