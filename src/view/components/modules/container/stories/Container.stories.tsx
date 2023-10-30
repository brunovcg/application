import { Container } from '../../..';
import { StoryObj } from '@storybook/react';
import argTypes from './argTypes';

const meta = {
  title: 'Components/Container',
  component: Container,
  args: {
    label: 'This is a label',
    children: 'This is a container',
    showError: true,
  },
  argTypes,
};

export default meta;

type Story = StoryObj<typeof Container>;

const Template: Story = {
  render: (args) => <Container {...args} style={{ padding: '10px' }} />,
};

export const Control = {
  ...Template,
};
