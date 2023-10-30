import { StoryObj } from '@storybook/react';
import SelectorUSStatesView from './SelectorUSStates.view';
import { usStates } from '../../../../../apis/services/states-services/States.services.types';
import i18next from 'i18next';
import { SelectorUSStatesViewProps } from './SelectorUSStates.types';
import { RefAttributes } from 'react';
import { SelectorRef } from '../selector/Selector.types';

const wrapper = (args: SelectorUSStatesViewProps & RefAttributes<SelectorRef>) => {
  const label = args.multiple ? i18next.t('Components.SelectorUSStates.States') : i18next.t('Components.SelectorUSStates.State');
  return <SelectorUSStatesView {...args} label={label} />;
};

const meta = {
  title: 'Components/FormGroup/SelectorUSStates',
  component: SelectorUSStatesView,
  args: {
    states: usStates,
    multiple: false,
    onSelect: (value: unknown[]) => alert(JSON.stringify(value)),
    disabled: false,
    headerEqualizer: false,
    loading: false,
  },
};

export default meta;

type Story = StoryObj<typeof SelectorUSStatesView>;

const Template: Story = {
  render: (args) => wrapper(args),
};

export const Control = {
  ...Template,
};
