import { act, render, waitFor } from '@testing-library/react';
import SelectorCustomerView from './SelectorCustomer.view';
import user from '@testing-library/user-event';
import Constants from '../../../../../utils/constants/Constants';

const { ACTIVE } = Constants.USER.STATUS;
const { CUSTOMER } = Constants.USER.TYPES;

const options = [
  {
    groupsCount: 0,
    id: 1,
    name: 'Investor',
    status: ACTIVE,
    username: 'investor@email.com',
    userType: CUSTOMER,
  } as const,
  {
    groupsCount: 0,
    id: 2,
    name: 'Machine',
    status: ACTIVE,
    username: 'machine@email.com',
    userType: CUSTOMER,
  } as const,
];

describe('SelectorCustomer Component', () => {
  test('It should be able to click open a list and render the options', () => {
    const { getByTestId, getByText } = render(
      <SelectorCustomerView options={options} loading={false} onViewSelect={() => {}} label="Customers" show={true} />
    );
    const selectCustomer = getByTestId('im-selector-customer');
    act(() => {
      user.click(selectCustomer);
    });
    waitFor(() => {});
    const user1 = getByText(/Investor/);
    const user2 = getByText(/Machine/);
    const userMail1 = getByText(/investor@email/);
    const userMail2 = getByText(/machine@email/);
    expect(user1).toBeInTheDocument();
    expect(user2).toBeInTheDocument();
    expect(userMail1).toBeInTheDocument();
    expect(userMail2).toBeInTheDocument();
  });
  test('It should be unable to click open a list and render the options and display loading spinner', () => {
    const { getByTestId, queryByTestId } = render(
      <SelectorCustomerView options={options} loading onViewSelect={() => {}} label="Customers" show={true} />
    );
    const selectCustomers = getByTestId('im-selector-customer');
    act(() => {
      user.click(selectCustomers);
    });
    const optionsList = queryByTestId('im-customer-options-list');
    expect(optionsList).not.toBeInTheDocument();
    const loading = getByTestId('im-loading-spinner');
    expect(loading).toBeInTheDocument();
  });
});
