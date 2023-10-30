import { DeleteConfirmation } from '../..';
import { StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/DeleteConfirmation',
  component: DeleteConfirmation,
  args: {},
};

export default meta;

type Story = StoryObj<typeof DeleteConfirmation>;

const Template: Story = {
  render: (args) => <DeleteConfirmation {...args} />,
};

export const Control = {
  ...Template,
};
