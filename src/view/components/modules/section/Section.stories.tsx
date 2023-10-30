import Section from './Section';
import { StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Section',
  component: Section,
  args: {
    icon: 'add',
    title: 'Section Title',
    children: <div>This is a text to test Section Content</div>,
    width: '500px',
  },
};

export default meta;

type Story = StoryObj<typeof Section>;

const Template: Story = {
  render: ({ children, ...args }) => <Section {...args}>{children} </Section>,
};

export const Control = {
  ...Template,
};
