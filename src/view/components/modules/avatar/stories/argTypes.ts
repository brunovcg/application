import { avatarSizes } from '../Avatar.types';

export default {
  username: {
    control: 'text',
  },
  size: {
    options: avatarSizes,
    control: { type: 'select' },
  },
  active: {
    control: 'boolean',
  },
};
