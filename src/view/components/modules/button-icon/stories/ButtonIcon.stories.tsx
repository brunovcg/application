import { ButtonIcon } from '../../..';
import { StoryObj } from '@storybook/react';
import argTypes from './argTypes';

const meta = {
  title: 'Components/ButtonIcon',
  component: ButtonIcon,
  args: {
    icon: 'add',
    size: 'medium',
  },
  argTypes,
};

export default meta;

type Story = StoryObj<typeof ButtonIcon>;

const Template: Story = {
  render: (args) => <ButtonIcon {...args} />,
};

export const Control = {
  ...Template,
};
