import { SearchMenu } from '../..';
import { StoryObj } from '@storybook/react';

const options = [
  { id: 1, display: 'This is investor', content: 'This is a sample content' },
  { id: 1, display: 'This is a machine', content: 'This is another text' },
];

const meta = {
  title: 'Components/SearchMenu',
  component: SearchMenu,
  args: {
    options,
    displayAccessor: 'display',
    contentAccessor: 'content',
    onOptionClick: (option: (typeof options)[number]) => alert(JSON.stringify(option)),
    debounce: 300,
    label: 'SearchMenu',
  },
};

export default meta;

type Story = StoryObj<typeof SearchMenu>;

const Template: Story = {
  render: (args) => <SearchMenu {...args} />,
};

export const Control = {
  ...Template,
};
