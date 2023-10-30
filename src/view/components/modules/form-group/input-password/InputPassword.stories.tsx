import { InputPassword } from '../../..';
import { StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/FormGroup/InputPassword',
  component: InputPassword,
  args: {
    label: 'Input Password',
    width: '250px',
    maxWidth: '400px',
    errorMessage: '',
    disabled: false,
    canClear: true,
    placeholder: '',
  },
};

export default meta;

type Story = StoryObj<typeof InputPassword>;

const Template: Story = {
  render: (args) => <InputPassword {...args} />,
};

export const Control = {
  ...Template,
};
