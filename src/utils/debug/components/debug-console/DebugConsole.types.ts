import { Dispatch, SetStateAction } from 'react';

export type DebugConsoleProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  zIndex: number;
};
