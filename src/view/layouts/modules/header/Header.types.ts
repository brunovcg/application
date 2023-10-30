import { RouteName } from '../../../../router/useRoutes.types';
import { WithPrefix } from '../../../../types';
import { IconName } from '../../../components/modules/icon/Icon.types';

export type HeaderExternalLink = {
  path: WithPrefix<'http'>;
  active: true;
  permission: boolean;
  data: { icon: IconName; text: string };
  name?: RouteName;
}[];
