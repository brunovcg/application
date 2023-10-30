import { MessageContainer } from '../..';
import { StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/MessageContainer',
  component: MessageContainer,
  args: {
    text: 'This is a message',
    fontSize: 'medium',
    width: '300px',
    variant: 'info',
    bold: false,
    smallPadding: false,
  },
};

export default meta;

type Story = StoryObj<typeof MessageContainer>;

const Template: Story = {
  render: (args) => <MessageContainer {...args} />,
};

export const Control = {
  ...Template,
};
