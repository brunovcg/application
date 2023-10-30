import { Tooltip } from '../..';
import { StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  args: {
    side: 'right',
    help: true,
    content: 'IM a tooltip content',
    trigger: <div style={{ width: 'fit-content' }}>Trigger</div>,
    delay: 0,
    enabled: true,
  },
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

const Template: Story = {
  render: (args) => <Tooltip {...args} />,
};

export const Control = {
  ...Template,
};
