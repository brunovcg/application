import { RouteName } from '../../../../router/useRoutes.types';
import { WithPrefix } from '../../../../types';

type CustomNavigateArgs =
  | {
      routeName: RouteName;
      path?: never;
      params?: { [key: string]: string };
    }
  | {
      routeName?: never;
      path: string;
      params?: never;
    };

export type NavigateArgs = CustomNavigateArgs & {
  search?: WithPrefix<'?'>;
};
