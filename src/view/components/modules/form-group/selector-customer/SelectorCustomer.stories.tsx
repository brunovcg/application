import { StoryObj } from '@storybook/react';
import SelectorCustomer from './SelectorCustomer.view';
import i18next from 'i18next';
import { SelectorCustomerRef, SelectorCustomerViewProps } from './SelectorCustomer.types';
import { RefAttributes } from 'react';
import Constants from '../../../../../utils/constants/Constants';

const { CUSTOMER } = Constants.USER.TYPES;
const { ACTIVE } = Constants.USER.STATUS;

const wrapper = (args: SelectorCustomerViewProps & RefAttributes<SelectorCustomerRef>) => {
  const label = args.multiple ? i18next.t('Components.SelectorCustomers.Customers') : i18next.t('Components.SelectorCustomers.Customer');
  return <SelectorCustomer {...args} label={label} />;
};

const meta = {
  title: 'Components/FormGroup/SelectorCustomer',
  component: SelectorCustomer,
  args: {
    options: [
      { groupsCount: 0, id: 1, name: 'Investor', status: ACTIVE, username: 'investor@email.com', userType: CUSTOMER },
      { groupsCount: 0, id: 2, name: 'Machine', status: ACTIVE, username: 'machine@email.com', userType: CUSTOMER },
    ],
    multiple: false,
    onSelect: (value: unknown[]) => alert(JSON.stringify(value[0])),
    disabled: false,
    headerEqualizer: false,
    outputFormat: 'username',
    show: true,
  },
};

export default meta;

type Story = StoryObj<typeof SelectorCustomer>;

const Template: Story = {
  render: (args) => wrapper(args),
};

export const Control = {
  ...Template,
};
