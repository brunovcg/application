import Constants from '../../utils/constants/Constants';
import { SetServiceEnvironment } from './types';

const envKeys = Constants.ENVIRONMENT_KEYS;
const { ENVIRONMENTS } = Constants;
abstract class Environment {
  private static getMode() {
    const forcedEnvironment = Environment.getVariable('FORCE_BACK_END_ENV') as (typeof ENVIRONMENTS)[number] | undefined;

    if (forcedEnvironment && ENVIRONMENTS.includes(forcedEnvironment)) {
      return forcedEnvironment;
    }

    switch (window.location.hostname) {
      case 'app.theinvestormachine.com': {
        return 'production';
      }
      case 'stage.app.theinvestormachine.com': {
        return 'staging';
      }
      case 'localhost': {
        return 'development';
      }
      default: {
        return 'staging';
      }
    }
  }

  static mode = Environment.getMode();

  static getVariable(key: keyof typeof envKeys) {
    const envValue = envKeys[`${key}`];
    return process.env[`${envValue}`];
  }

  static configServiceBaseURL({ production, staging, development }: SetServiceEnvironment) {
    const serviceEnvironment = {
      production,
      staging,
      development,
    };
    return serviceEnvironment[Environment.getMode()];
  }
}

export default Environment;
