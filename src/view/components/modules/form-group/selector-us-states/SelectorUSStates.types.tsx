import { USState } from '../../../../../apis/services/states-services/States.services.types';

type CustomProps =
  | {
      excludeList?: USState[];
      onlyList?: never;
    }
  | {
      excludeList?: never;
      onlyList?: USState[];
    };

export type SelectorUSStatesProps = CustomProps & {
  name?: string;
  showError?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  onSelect?: (output: USState[]) => void;
  className?: string;
  initialStates?: USState[];
  width?: string;
  headerEqualizer?: boolean;
};

export type SelectorUSStatesViewProps = {
  states: USState[];
  loading: boolean;
  label: string;
  initialStates?: USState[];
  name?: string;
  showError?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  onSelect?: (output: USState[]) => void;
  className?: string;
  width?: string;
  headerEqualizer?: boolean;
};
