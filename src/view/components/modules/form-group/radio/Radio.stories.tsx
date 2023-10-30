import { Radio } from '../../..';
import { StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/FormGroup/Radio',
  component: Radio,
  args: {
    label: 'This is a Radio',
    disabled: false,
    checked: false,
  },
};

export default meta;

type Story = StoryObj<typeof Radio>;

const Template: Story = {
  render: (args) => <Radio {...args} />,
};

export const Control = {
  ...Template,
};
