import Constants from '../../../utils/constants/Constants';
import { AdSense, ConfiguredCustomer, DeleteAudienceArgs } from '../../services/ad-sense-services/AdSense.services.types';
const { ACTIVE } = Constants.STATUS;

export type UseListCustomerAdSenseConfigurationsQuery = {
  customerId: number | null;
};

export type UseListCustomerAudiencesQuery = { customerId: number | null };

export type ActiveConfiguredCustomer = Omit<ConfiguredCustomer, 'adSenseConfigurations'> & {
  adSenseConfigurations: (Omit<AdSense, 'status'> & { status: typeof ACTIVE })[];
};

export type ListActiveConfiguredCustomers = ActiveConfiguredCustomer[];

export type UseDeleteAudienceMutation = DeleteAudienceArgs & { customerId: number };
