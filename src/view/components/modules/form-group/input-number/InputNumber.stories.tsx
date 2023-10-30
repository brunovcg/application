import { InputNumber } from '../../..';
import { StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/FormGroup/InputNumber',
  component: InputNumber,
  args: {
    width: '250px',
    maxWidth: '400px',
    max: 5,
    min: 0,
    errorMessage: '',
    placeholder: '',
    label: 'Input Number',
    canReset: true,
    initialValue: 1,
    optionalLabel: false,
    requiredLabel: false,
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof InputNumber>;

const Template: Story = {
  render: (args) => <InputNumber {...args} />,
};

export const Control = {
  ...Template,
};
