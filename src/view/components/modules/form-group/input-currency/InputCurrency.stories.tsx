import { InputCurrency } from '../../..';
import { StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/FormGroup/InputCurrency',
  component: InputCurrency,
  args: {
    width: '250px',
    label: 'Input Currency',
  },
};

export default meta;

type Story = StoryObj<typeof InputCurrency>;

const Template: Story = {
  render: (args) => <InputCurrency {...args} />,
};

export const Control = {
  ...Template,
};
