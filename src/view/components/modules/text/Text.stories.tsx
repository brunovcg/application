import { Text } from '../..';
import { StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Text',
  component: Text,
  args: {
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised',
  },
};

export default meta;

type Story = StoryObj<typeof Text>;

const Template: Story = {
  render: (args) => <Text {...args} />,
};

export const Control = {
  ...Template,
};
