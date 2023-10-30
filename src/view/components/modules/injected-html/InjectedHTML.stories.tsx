import { InjectedHTML } from '../..';
import { StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/InjectedHTML',
  component: InjectedHTML,
  args: {
    html: `<ul style='display:flex; flex-direction:column; gap: 10px; margin-left: 10px'>
              <li style='color:blue'>IM an injected HTML</li>
              <li><b>IM a second line</b></li>
           </ul>`,
  },
};

export default meta;

type Story = StoryObj<typeof InjectedHTML>;

const Template: Story = {
  render: (args) => <InjectedHTML {...args} />,
};

export const Control = {
  ...Template,
};
