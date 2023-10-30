import { EventKey } from '../../../../types';

export type HoldActions =
  | {
      hold?: EventKey;
      ignoreHold?: never;
    }
  | {
      hold?: never;
      ignoreHold?: EventKey;
    };

export type UseOnKeyPressProps = HoldActions & {
  keys: EventKey[];
  callback: (e?: KeyboardEvent) => void;
  enabled?: boolean;
};
