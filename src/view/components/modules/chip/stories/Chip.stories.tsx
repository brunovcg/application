import { Chip } from '../../..';
import { StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Chip',
  component: Chip,
  args: {
    text: 'Chip',
  },
};

export default meta;

type Story = StoryObj<typeof Chip>;

const Template: Story = {
  render: (args) => <Chip {...args} />,
};

export const Control = {
  ...Template,
};
