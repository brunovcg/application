import { iconSizes } from '../../icon/Icon.types';
import { icons } from '../../icon/Icon.map';
import Constants from '../../../../../utils/constants/Constants';
const { COLORS } = Constants;

const argTypes = {
  icon: {
    options: Object.keys(icons),
    control: { type: 'select' },
  },
  variant: {
    options: Object.keys(COLORS),
    control: { type: 'select' },
  },
  hide: {
    control: 'boolean',
  },
  showBorder: { control: 'boolean' },
  href: {
    control: 'text',
  },
  disabled: {
    control: 'boolean',
  },
  error: {
    control: 'boolean',
  },
  size: {
    control: 'select',
    options: iconSizes,
  },
};

export default argTypes;
