import { InputFile } from '../../..';
import { StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/FormGroup/InputFile',
  component: InputFile,
  args: {
    width: '250px',
    label: 'Input File',
  },
};

export default meta;

type Story = StoryObj<typeof InputFile>;

const Template: Story = {
  render: (args) => <InputFile {...args} />,
};

export const Control = {
  ...Template,
};
