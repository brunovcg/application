import { Avatar } from '../../..';
import { StoryObj } from '@storybook/react';
import argTypes from './argTypes';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  args: {
    username: 'im@theinvestormachine.com',
    name: 'Investor Machine',
    size: 'small',
  },
  argTypes,
};

export default meta;

type Story = StoryObj<typeof Avatar>;

const Template: Story = {
  render: (args) => <Avatar {...args} />,
};

export const Control = {
  ...Template,
};
