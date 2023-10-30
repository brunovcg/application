import { Selector } from '../../..';
import { StoryObj } from '@storybook/react';

const options = ['first', 'second', 'third'];

const meta = {
  title: 'Components/FormGroup/Selector',
  component: Selector,
  args: {
    options,
    width: '250px',
    maxWidth: '400px',
    listMaxHeight: undefined,
    listHeight: undefined,
    label: 'Select',
    placeholder: '',
    name: '',
    onSelect: (value: unknown[]) => alert(value[0]),
    loading: false,
    disabled: false,
    requiredLabel: false,
    allowClear: false,
    allowReset: false,
    allowSearch: true,
    showError: false,
    multiple: false,
    optionsInRow: false,
    headerEqualizer: false,
    valid: false,
  },
};

export default meta;

type Story = StoryObj<typeof Selector>;

const Template: Story = {
  render: (args) => <Selector {...args} />,
};

export const Control = {
  ...Template,
};
