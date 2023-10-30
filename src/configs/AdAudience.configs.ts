import Constants from '../utils/constants/Constants';

const { AD_SENSE_TYPE } = Constants;

abstract class ADAudienceConfigs {
  static disabledPlatforms: (keyof typeof AD_SENSE_TYPE)[] = ['Bing', 'Google'];
}

export default ADAudienceConfigs;
