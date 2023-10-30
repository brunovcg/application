import { RouteName } from '../router/useRoutes.types';
import Environment from './Environment/Environment';

abstract class FeatureFlags {
  static modules: Record<RouteName, boolean> = {
    dashboard: true,
    home: true,
    addressLookup: true,
    processRunner: Environment.mode !== 'production',
    buyBox: true,
    purchasedProperties: true,
    myLeads: true,
    accessControl: true,
    support: Environment.mode !== 'production',
    notFound: true,
    content: true,
    products: true,
    community: true,
    vendors: true,
    login: true,
    createPassword: true,
    forgotPassword: true,
    orders: true,
    motivations: Environment.mode !== 'production',
    inputResults: true,
    qualityAssurance: Environment.mode !== 'production',
    partners: true,
    adAudience: true,
    scalingSystem: true,
    scalingSystemGroup: true,
    scalingSystemSession: true,
  };
}

export default FeatureFlags;
