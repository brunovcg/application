import { Title } from '../..';
import { StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Title',
  component: Title,
  args: {
    size: 'regular',
    text: 'Im a Title',
    variant: 'primary',
    icon: 'edit',
  },
};

export default meta;

type Story = StoryObj<typeof Title>;

const Template: Story = {
  render: (args) => <Title {...args} />,
};

export const Control = {
  ...Template,
};
