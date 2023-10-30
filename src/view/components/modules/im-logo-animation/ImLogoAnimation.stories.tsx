import { ImLogoAnimation } from '../..';
import { StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/ImLogoAnimation',
  component: ImLogoAnimation,
  args: { size: 'small' },
};

export default meta;

type Story = StoryObj<typeof ImLogoAnimation>;

const Template: Story = {
  render: (args) => <ImLogoAnimation {...args} />,
};

export const Control = {
  ...Template,
};
