import Constants from '../../../../utils/constants/Constants';
import UserTypeChip from './UserTypeChip';
import { StoryObj } from '@storybook/react';

const { CUSTOMER, INTERNAL_USER } = Constants.USER.TYPES;

const meta = {
  title: 'Components/UserTypeChip',
  component: UserTypeChip,
  args: {
    userType: CUSTOMER,
  },
  argTypes: {
    userType: {
      control: 'select',
      options: [CUSTOMER, INTERNAL_USER],
    },
  },
};

export default meta;

type Story = StoryObj<typeof UserTypeChip>;

const Template: Story = {
  render: (args) => <UserTypeChip {...args} />,
};

export const Control = {
  ...Template,
};
