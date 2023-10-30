import { RefObject } from 'react';
import { IconName } from '../../../../components/modules/icon/Icon.types';

export type DrawerMenu = {
  id: number;
  permit: boolean;
  icon?: IconName;
  text: string;
  onClick: () => void;
};

export type DrawerProps = {
  hideDrawer: () => void;
  menuRef: RefObject<HTMLDivElement>;
};
