import { Divider } from '../..';
import { StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Divider',
  component: Divider,
  args: {},
};

export default meta;

type Story = StoryObj<typeof Divider>;

const Template: Story = {
  render: (args) => <Divider {...args} />,
};

export const Control = {
  ...Template,
};
