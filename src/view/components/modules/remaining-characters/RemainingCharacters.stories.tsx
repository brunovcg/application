import { RemainingCharacters } from '../..';
import { StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/RemainingCharacters',
  component: RemainingCharacters,
  args: {
    remainingCharacters: 5,
  },
  argsTypes: {
    remainingCharacters: {
      control: 'number',
    },
  },
};

export default meta;

type Story = StoryObj<typeof RemainingCharacters>;

const Template: Story = {
  render: (args) => (
    <div
      style={{ border: '1px solid gray', width: '100px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <RemainingCharacters {...args} />
    </div>
  ),
};

export const Control = {
  ...Template,
};
