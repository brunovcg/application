import { Video } from '../..';
import { StoryObj } from '@storybook/react';
import { ServicesEndpointsConfigs } from '../../../../configs';

const { srcExample } = ServicesEndpointsConfigs.storybook.video;

const meta = {
  title: 'Components/Video',
  component: Video,
  args: {
    title: 'im video title',
    src: srcExample,
    allowFullScreen: true,
    autoplay: true,
  },
};

export default meta;

type Story = StoryObj<typeof Video>;

const Template: Story = {
  render: (args) => <Video {...args} />,
};

export const Control = {
  ...Template,
};
