import { UserFeedback } from '../..';
import { StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/UserFeedback',
  component: UserFeedback,
  args: {
    message: 'This is a feedback',
    variant: 'loading',
    fontSize: 'medium',
    width: '800px',
  },
};

export default meta;

type Story = StoryObj<typeof UserFeedback>;

const Template: Story = {
  render: (args) => <UserFeedback {...args} />,
};

export const Control = {
  ...Template,
};
