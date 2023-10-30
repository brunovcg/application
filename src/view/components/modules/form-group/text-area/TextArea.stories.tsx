import { TextArea } from '../../..';
import { StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/FormGroup/TextArea',
  component: TextArea,
  args: {
    label: 'Input Text',
    width: '250px',
    maxWidth: '400px',
    errorMessage: '',
    disabled: false,
    canClear: true,
    placeholder: '',
    canReset: true,
    initialValue: 'initial value',
    maxLength: 300,
    showHeader: true,
    debounce: 0,
    onChange: (value: string) => console.log(value),
    optionalLabel: false,
    requiredLabel: false,
  },
};

export default meta;

type Story = StoryObj<typeof TextArea>;

const Template: Story = {
  render: (args) => <TextArea {...args} />,
};

export const Control = {
  ...Template,
};
