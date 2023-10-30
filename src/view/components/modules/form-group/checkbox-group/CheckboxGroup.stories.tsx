import { CheckboxGroup } from '../../..';
import { StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/FormGroup/CheckboxGroup',
  component: CheckboxGroup,
  args: {
    label: 'Checkbox group',
    width: 'fit-content',
    options: [
      {
        id: 1,
        label: 'This is Option 1',
      },
      {
        id: 2,
        label: 'This is Option 2',
      },
      {
        id: 3,
        label: 'This is Option 3',
      },
    ],
  },
};

export default meta;

type Story = StoryObj<typeof CheckboxGroup>;

const Template: Story = {
  render: (args) => <CheckboxGroup {...args} />,
};

export const Control = {
  ...Template,
};
