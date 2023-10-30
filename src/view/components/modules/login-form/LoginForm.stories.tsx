import { LoginForm } from '../..';
import { StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/LoginForm',
  component: LoginForm,
  args: {},
};

export default meta;

type Story = StoryObj<typeof LoginForm>;

const Template: Story = {
  render: (args) => <LoginForm {...args} />,
};

export const Control = {
  ...Template,
};
