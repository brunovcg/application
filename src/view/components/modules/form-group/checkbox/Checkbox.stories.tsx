import { Checkbox } from '../../..';
import { StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/FormGroup/Checkbox',
  component: Checkbox,
  args: {
    label: 'This is a checkbox',
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

const Template: Story = {
  render: (args) => <Checkbox {...args} />,
};

export const Control = {
  ...Template,
};
