import { List } from '../..';
import { StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/List',
  component: List,
  args: {
    lines: [
      { id: 1, text: 'first line' },
      { id: 2, text: 'second line' },
      { id: 3, text: 'third line' },
    ],
  },
};

export default meta;

type Story = StoryObj<typeof List>;

const Template: Story = {
  render: (args) => <List {...args} />,
};

export const Control = {
  ...Template,
};
