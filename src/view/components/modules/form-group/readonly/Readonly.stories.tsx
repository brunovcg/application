import { Readonly } from '../../..';
import { StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/FormGroup/Readonly',
  component: Readonly,
  args: {
    label: 'This is a Readonly',
    width: '250px',
    text: 'ready only text',
  },
};

export default meta;

type Story = StoryObj<typeof Readonly>;

const Template: Story = {
  render: (args) => <Readonly {...args} />,
};

export const Control = {
  ...Template,
};
