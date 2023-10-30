import { RadioGroup } from '../../..';
import { StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/FormGroup/RadioGroup',
  component: RadioGroup,
  args: {
    label: 'Radio group',
    width: 'fit-content',
    accessor: 'id',
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

type Story = StoryObj<typeof RadioGroup>;

const Template: Story = {
  render: (args) => <RadioGroup {...args} />,
};

export const Control = {
  ...Template,
};
