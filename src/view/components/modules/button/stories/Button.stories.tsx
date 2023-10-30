import { Button } from '../../..';
import { StoryObj } from '@storybook/react';
import argTypes from './argTypes';

const meta = {
  title: 'Components/Button',
  component: Button,
  args: {
    text: 'Button',
    styling: 'regular',
  },
  argTypes,
};

export default meta;

type Story = StoryObj<typeof Button>;

const Template: Story = {
  render: (args) => <Button {...args} />,
};

export const Control = {
  ...Template,
};
