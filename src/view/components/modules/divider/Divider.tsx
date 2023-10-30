import Constants from '../../../../utils/constants/Constants';
import { DividerProps } from './Divider.types';
const { BACKGROUND_COLORS } = Constants;

export default function Divider({ width, maxWidth, margin = '30px 0', variant = 'border', thickness = 1 }: DividerProps) {
  const height = {
    1: '1px',
    2: '2px',
    3: '3px',
  };

  return (
    <hr
      className="im-divider"
      style={{ width, margin, maxWidth, height: height[`${thickness}`], background: BACKGROUND_COLORS[`${variant}`], border: 'none' }}
    />
  );
}
