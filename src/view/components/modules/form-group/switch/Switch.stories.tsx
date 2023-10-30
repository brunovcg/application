import { Switch } from '../../..';
import { StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/FormGroup/Switch',
  component: Switch,
  args: {
    leftOption: 'Left Label',
    rightOption: 'Right Label',
    modeOnOff: false,
    disabled: false,
    hideLabel: false,
    loading: false,
  },
};

export default meta;

type Story = StoryObj<typeof Switch>;

const Template: Story = {
  render: (args) => <Switch {...args} />,
};

export const Control = {
  ...Template,
};
