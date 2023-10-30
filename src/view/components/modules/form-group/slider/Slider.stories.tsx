import { Slider } from '../../..';
import { StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/FormGroup/Slider',
  component: Slider,
  args: {
    label: 'Slider',
    initialValue: 0,
    min: 0,
    max: 5,
    width: '250px',
    showCaption: true,
    requiredLabel: false,
    showInputArrows: true,
    step: 1,
    errorMessage: '',
    showError: true,
    percent: false,
  },
};

export default meta;

type Story = StoryObj<typeof Slider>;

const Template: Story = {
  render: (args) => <Slider {...args} />,
};

export const Control = {
  ...Template,
};
