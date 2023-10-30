import { NotificationBubble } from '../..';
import { StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/NotificationBubble',
  component: NotificationBubble,
  args: { quantity: 999, margin: '-10px -10px 0 0' },
};

export default meta;

type Story = StoryObj<typeof NotificationBubble>;

const Template: Story = {
  render: (args) => (
    <div style={{ position: 'relative', width: '60px', height: '60px', background: 'blue' }}>
      <NotificationBubble {...args} />
    </div>
  ),
};

export const Control = {
  ...Template,
};
