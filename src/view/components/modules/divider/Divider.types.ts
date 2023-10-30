import Constants from '../../../../utils/constants/Constants';
const { BACKGROUND_COLORS } = Constants;

export type DividerProps = {
  width?: string;
  maxWidth?: string;
  margin?: string;
  variant?: keyof typeof BACKGROUND_COLORS;
  thickness?: 1 | 2 | 3;
};
