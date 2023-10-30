import { ImLogo } from '../..';
import { StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/ImLogo',
  component: ImLogo,
  args: { size: 'small' },
};

export default meta;

type Story = StoryObj<typeof ImLogo>;

const Template: Story = {
  render: (args) => <ImLogo {...args} />,
};

export const Control = {
  ...Template,
};
