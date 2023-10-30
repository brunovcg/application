import { useTranslation } from 'react-i18next';
import { userQueries } from '../../../../../apis/queries';
import SelectorCustomerView from './SelectorCustomer.view';
import { useTranslationPath } from '../../../../../utils/hooks';
import { ForwardedRef, forwardRef, useContext, useLayoutEffect, useMemo } from 'react';
import { SelectorCustomerProps, SelectorCustomerRef } from './SelectorCustomer.types';
import useSelectorCustomerPermissions from './SelectorCustomer.permissions';
import { SessionUser } from '../../../../../contexts/modules/user-session/UserSessionContext.types';
import { ListUsersResponse } from '../../../../../apis/services/user-services/User.services.types';
import Constants from '../../../../../utils/constants/Constants';
import { UserSessionContext } from '../../../../../contexts/modules/user-session/UserSessionContext';

const { useListCustomersQuery } = userQueries;
const { ACTIVE } = Constants.USER.STATUS;
const { CUSTOMER } = Constants.USER.TYPES;

const formatCustomerUser = (user: SessionUser) =>
  ({
    groupsCount: 0,
    id: user.id,
    name: user.name,
    status: ACTIVE,
    username: user.username,
    userType: CUSTOMER,
  } as const);

function SelectorCustomer(props: SelectorCustomerProps, ref: ForwardedRef<SelectorCustomerRef>) {
  const {
    multiple,
    disabled,
    onSelect,
    headerEqualizer,
    initCustomersIds,
    filterOptionsByIds,
    loading,
    outputFormat = 'username',
    ...rest
  } = props;

  const { t } = useTranslation();
  const path = useTranslationPath('Components.SelectorCustomer');
  const label = multiple ? t(path('Customers')) : t(path('Customer'));
  const permissions = useSelectorCustomerPermissions();
  const { sessionUser } = useContext(UserSessionContext);
  const { customerList, customerListIsLoading } = useListCustomersQuery({ enabled: sessionUser.isLogged && !sessionUser.isCustomer });

  const effectiveCustomerList = useMemo(() => {
    if (filterOptionsByIds) {
      return customerList.filter((item) => filterOptionsByIds.includes(item.id));
    }

    return customerList;
  }, [customerList, filterOptionsByIds]);

  const initial = useMemo(() => {
    if (sessionUser.isCustomer) {
      return [formatCustomerUser(sessionUser)];
    }

    return effectiveCustomerList.filter((customer) => initCustomersIds?.includes(customer.id));
  }, [sessionUser, effectiveCustomerList.length]);

  const handleSelect = (selection: ListUsersResponse) => {
    if (outputFormat === 'id') {
      if (sessionUser.isCustomer) {
        onSelect?.([sessionUser.id] as never);
        return;
      }
      const customerIds = selection.map((customer) => customer.id);
      onSelect?.(customerIds as never);
      return;
    }

    if (outputFormat === 'username') {
      if (sessionUser.isCustomer) {
        onSelect?.([sessionUser.username as never]);
        return;
      }
      const customersUsernames = selection.map((customer) => customer.username);
      onSelect?.(customersUsernames as never);
      return;
    }

    onSelect?.(selection as never);
  };

  useLayoutEffect(() => {
    if (sessionUser.isCustomer) {
      handleSelect([formatCustomerUser(sessionUser)]);
    }
  }, [sessionUser]);

  useLayoutEffect(() => {
    if (!sessionUser.isCustomer && effectiveCustomerList.length && initCustomersIds) {
      const selection = effectiveCustomerList.filter((item) => initCustomersIds.includes(item.id));

      handleSelect(selection);
    }
  }, [sessionUser, effectiveCustomerList]);

  if (!sessionUser?.isLogged) {
    return null;
  }

  const options = sessionUser.isCustomer
    ? [
        {
          groupsCount: 0,
          id: sessionUser.id,
          name: sessionUser.name,
          status: ACTIVE,
          username: sessionUser.username,
          userType: CUSTOMER,
        } as const,
      ]
    : effectiveCustomerList ?? [];

  return (
    <SelectorCustomerView
      options={options}
      onViewSelect={handleSelect}
      disabled={disabled ?? customerListIsLoading}
      loading={customerListIsLoading || !!loading}
      label={label}
      multiple={multiple}
      initValue={initial}
      headerEqualizer={headerEqualizer}
      show={permissions.selectCustomer}
      {...rest}
      ref={ref}
    />
  );
}

export default forwardRef(SelectorCustomer);
