import { Popover } from '../..';
import { StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Popover',
  component: Popover,
  args: {
    trigger: <div style={{ background: 'blue', color: 'white', padding: '10px', width: 'fit-content' }}>Trigger</div>,
    title: 'Popover title',
    content: <div>This is a popover content</div>,
  },
};

export default meta;

type Story = StoryObj<typeof Popover>;

const Template: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100vw' }}>
      <div id="dialog" />
      <div style={{ width: '90px' }}>
        <Popover {...args} />
      </div>
    </div>
  ),
};

export const Control = {
  ...Template,
};
