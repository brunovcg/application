import { WithPrefix } from '../../types';
import Constants from '../../utils/constants/Constants';

export type SetServiceEnvironment = { production: WithPrefix<'http'>; staging: WithPrefix<'http'>; development: WithPrefix<'http'> };

export type EnvironmentMode = (typeof Constants.ENVIRONMENTS)[number];
