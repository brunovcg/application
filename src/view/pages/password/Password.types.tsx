import { RouteName } from '../../../router/useRoutes.types';
import { WithPrefix } from '../../../types';

export type PasswordProps = {
  title: string;
  invalidLinkButtonText: string;
  successText: string;
  invalidLinkCallbackPath?: { route: RouteName; param: WithPrefix<'?'> };
};
