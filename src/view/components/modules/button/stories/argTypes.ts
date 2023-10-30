import { icons } from '../../icon/Icon.map';
import Constants from '../../../../../utils/constants/Constants';
import { buttonStyling } from '../Button.types';

const { COLORS } = Constants;

export default {
  text: {
    control: 'text',
  },
  variant: {
    options: Object.keys(COLORS),
    control: { type: 'select' },
  },
  styling: {
    options: buttonStyling,
    control: { type: 'select' },
  },
  href: {
    control: 'text',
  },
  width: {
    control: 'text',
  },
  height: {
    control: 'text',
  },
  disabled: {
    control: 'boolean',
  },
  icon: {
    options: Object.keys(icons),
    control: { type: 'select' },
  },
  loading: {
    control: 'boolean',
  },
  small: {
    control: 'boolean',
  },
};
