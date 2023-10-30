import ButtonImage from './ButtonImage';
import { StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/ButtonImage',
  component: ButtonImage,
  args: {
    backgroundImage:
      'https://www.theinvestormachine.com/hosted/images/dc/c57542bd5b4e5ca1d2dd1b767dcfd8/investor_machine_horizontal_colorwhite_R.png',
    height: '40px',
    width: '200px',
    selected: false,
  },
};

export default meta;

type Story = StoryObj<typeof ButtonImage>;

const Template: Story = {
  render: (args) => <ButtonImage {...args} />,
};

export const Control = {
  ...Template,
};
