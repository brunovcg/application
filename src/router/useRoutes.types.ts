import { ReactNode } from 'react';
import { IconName } from '../view/components/modules/icon/Icon.types';

type CustomRouteObject = { fallbackPath: string; permission: boolean } | { fallbackPath?: never; permission?: never };

export const routeNames = [
  'dashboard',
  'home',
  'addressLookup',
  'processRunner',
  'buyBox',
  'purchasedProperties',
  'myLeads',
  'accessControl',
  'support',
  'notFound',
  'content',
  'products',
  'community',
  'vendors',
  'login',
  'createPassword',
  'forgotPassword',
  'orders',
  'motivations',
  'inputResults',
  'qualityAssurance',
  'partners',
  'adAudience',
  'scalingSystem',
  'scalingSystemGroup',
  'scalingSystemSession',
] as const;

export type RouteName = (typeof routeNames)[number];
export type RouteNamesPaths = { [key in (typeof routeNames)[number]]: string };

export type RouteProps = {
  path: string;
  element: ReactNode;
  active: boolean;
  name: RouteName;
  children?: { [key: string]: RouteProps };
  index?: boolean;
  data: { item?: string; icon?: IconName; text?: string; description?: string };
} & CustomRouteObject;

export type RouteObject = {
  [key: string]: RouteProps;
};
