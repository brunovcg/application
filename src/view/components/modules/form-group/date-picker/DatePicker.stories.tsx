import { DatePicker } from '../../..';
import { StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/FormGroup/DatePicker',
  component: DatePicker,
  args: {
    canClear: true,
    label: 'Date Picker',
    requiredLabel: false,
    optionalLabel: false,
    range: true,
    disabled: false,
    showError: true,
    errorMessage: '',
  },
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

const Template: Story = {
  render: (args) => <DatePicker {...args} />,
};

export const Control = {
  ...Template,
};
