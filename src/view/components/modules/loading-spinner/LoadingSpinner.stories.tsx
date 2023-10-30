import { LoadingSpinner } from '../..';
import { StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/LoadingSpinner',
  component: LoadingSpinner,
  args: { message: true, size: 'small' },
  argTypes: {
    message: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof LoadingSpinner>;

const Template: Story = {
  render: (args) => <LoadingSpinner {...args} />,
};

export const Control = {
  ...Template,
};
