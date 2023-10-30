import { USState } from '../../../apis/services/states-services/States.services.types';

abstract class IMMarketHelper {
  static getCountyName(market?: string) {
    return market ? market.substring(4, market.length) : '';
  }

  static getStateName(market?: string) {
    return market ? (market.substring(0, 2) as USState) : ('' as USState);
  }
}

export default IMMarketHelper;
