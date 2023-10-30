import { DropdownMenu } from '../..';
import { StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
  args: {
    options: [
      {
        text: 'Option 1',
        icon: 'file',
      },
      {
        text: 'Option 2',
        icon: 'x-circle',
      },
    ],
  },
};

export default meta;

type Story = StoryObj<typeof DropdownMenu>;

const Template: Story = {
  render: (args) => <DropdownMenu {...args} />,
};

export const Control = {
  ...Template,
};
