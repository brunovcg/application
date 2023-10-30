import { NavigateArgs } from '../../../../utils/hooks/modules/use-navigation/useNavigation.types';

type CustomModules = { navigateArgs: NavigateArgs; handler?: never } | { navigateArgs?: never; handler: () => void };

export type BreadCrumbModule = {
  text: string;
} & CustomModules;

export type StyledBreadCrumbsProps = { width?: string };

export type BreadCrumbsProps = StyledBreadCrumbsProps & {
  modules: BreadCrumbModule[];
};
