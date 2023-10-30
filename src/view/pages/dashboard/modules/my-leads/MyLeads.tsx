import StyledTakeOffLists from './MyLeads.styled';
import { useTranslation } from 'react-i18next';
import { Button, ControlledTable, InputText, MessageContainer, Section, Selector, UserFeedback } from '../../../../components';
import { useTranslationPath, useOnKeyPress, useAbortSignal } from '../../../../../utils/hooks';
import { useCallback, useContext, useLayoutEffect, useMemo, useState } from 'react';
import Constants from '../../../../../utils/constants/Constants';
import { mailingListQueries, motivationsQueries } from '../../../../../apis/queries';
import { AddressServices } from '../../../../../apis/services';
import { useQueryClient } from 'react-query';
import { CSVLink } from 'react-csv';
import { Motivation } from '../../../../../apis/services/motivation-services/Motivation.services.types';
import { ListAddressesByAddressInfo, ListAddressesByOwnerInfo } from '../../../../../apis/services/address-services/Address.services.types';
import useMyLeadsPermissions from './MyLeads.permissions';
import useMyLeadsHelper from './hooks/useMyLeadsHelper';
import { Alert } from '../../../../../utils/helpers';
import { UserSessionContext } from '../../../../../contexts/modules/user-session/UserSessionContext';
import { DialogsContext } from '../../../../../contexts/modules/dialogs/DialogsContext';

const { SUPPRESSION_TEMPLATE } = Constants.CSV_TEMPLATES;

const { CUSTOMER } = Constants.MOTIVATION_SOURCES;
const { LIST_ADDRESS_MOTIVATIONS } = Constants.QUERIES;
const { useMailingListQuery } = mailingListQueries;
const { useDrivingForDollarsMotivationQuery, useMotivationSourceQuery } = motivationsQueries;

export default function MyLeads() {
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.MyLeads');
  const { columns } = useMyLeadsHelper();
  const { sessionUser } = useContext(UserSessionContext);
  const permit = useMyLeadsPermissions();
  const queryClient = useQueryClient();
  const notes = 'Added by Customer';

  const { motivationForDollars } = useDrivingForDollarsMotivationQuery();
  const { customerMotivationSource } = useMotivationSourceQuery(CUSTOMER);
  const { closeDialog, openDialog } = useContext(DialogsContext);

  const searchCriteriaOptions = {
    [t(path('LastName'))]: 'lastName',
    [t(path('FirstName'))]: 'firstName',
    [t(path('PropertyAddress'))]: 'properties-addresses',
    [t(path('MailingAddress'))]: 'mailing-addresses',
  } as const;

  const [selectedSearchCriteria, setSelectedSearchCriteria] = useState('' as keyof typeof searchCriteriaOptions);
  const [typedSearch, setTypedSearch] = useState('');
  const [enabledButton, setEnabledButton] = useState(false);
  const { signal, abortSignal } = useAbortSignal();
  const { addressList, addressListIsLoading, refetchList } = useMailingListQuery(
    typedSearch,
    searchCriteriaOptions[selectedSearchCriteria as keyof typeof searchCriteriaOptions] as unknown as
      | ListAddressesByAddressInfo
      | ListAddressesByOwnerInfo,
    signal
  );

  const tableHasData = !!addressList?.length;

  const confirmString = t('Common.Confirm');

  const handleSearch = useCallback(() => {
    if (!enabledButton) {
      return;
    }

    refetchList();

    setEnabledButton(false);
  }, [enabledButton, selectedSearchCriteria, typedSearch]);

  useOnKeyPress({ keys: ['Enter'], callback: handleSearch });

  useLayoutEffect(() => {
    if (typedSearch && selectedSearchCriteria) {
      setEnabledButton(true);
    } else {
      setEnabledButton(false);
    }
  }, [typedSearch, selectedSearchCriteria]);

  const handleStopMailing = (propertyId: number, flag: 'R' | 'S') => {
    AddressServices.stopMailing(propertyId, flag).then(() => {
      refetchList();
      queryClient.invalidateQueries(`${LIST_ADDRESS_MOTIVATIONS}-${propertyId}`);
      closeDialog('ConfirmationDialog');
      Alert.info(t(path('FlagChanged')));
    });
  };

  const feedback = useMemo(() => {
    if (addressListIsLoading) {
      return { variant: 'loading' as const };
    }
    if (!selectedSearchCriteria) {
      return { variant: 'warning' as const, message: t(path('SelectCriteria')) };
    }

    if (!typedSearch) {
      return { variant: 'warning' as const, message: t(path('TypeSearchValue')) };
    }

    if (enabledButton) {
      return { variant: 'info' as const, message: t(path('PressSearch')) };
    }
    return { variant: 'error' as const, message: t(path('NoData')) };
  }, [addressListIsLoading, selectedSearchCriteria, typedSearch, enabledButton]);

  return (
    <StyledTakeOffLists className="im-my-leads">
      <Section contentClassName="im-my-leads-filters" sectionTitle={t(path('SearchFilters'))} maxWidth="1300px" icon="filter">
        <Selector
          options={Object.keys(searchCriteriaOptions)}
          disabled={addressListIsLoading}
          label={t(path('SearchCriteria'))}
          maxWidth="250px"
          onSelect={(value) => setSelectedSearchCriteria(value[0] as keyof typeof searchCriteriaOptions)}
          showError={false}
        />
        <InputText
          label={t(path('SearchValue'))}
          maxWidth="250px"
          onChange={setTypedSearch}
          disabled={addressListIsLoading || !selectedSearchCriteria}
          showError={false}
        />
        <Button text={t('Common.Search')} icon="search" onClick={handleSearch} disabled={!enabledButton} />
        {addressListIsLoading && <Button icon="cancel" text={t('Common.Abort')} variant="error" onClick={() => abortSignal()} />}
      </Section>
      <div className="im-my-leads-feedback-wrapper">
        {tableHasData && !addressListIsLoading && (
          <Section maxWidth="1300px">
            <MessageContainer variant="info" text={t(path('Message'))} fontSize="medium" />
            <ControlledTable
              tableWidth="1400px"
              allowExportCSV={false}
              allowExportExcel={false}
              customHeader={
                <Button
                  text={
                    <CSVLink filename={t(path('BulkSuppressionTemplate'))} data={[SUPPRESSION_TEMPLATE.split(',')]}>
                      {t(path('DownloadBulk'))}
                    </CSVLink>
                  }
                  variant="primary"
                  styling="text"
                />
              }
              className="im-my-leads-table"
              data={addressList}
              columns={columns}
              paginate={[10, 25, 50, 'All']}
              onRowClick={(rowData) =>
                openDialog({
                  id: 'AddressDetailDialog',
                  props: {
                    data: rowData,
                    buttons: [
                      {
                        hide: !permit.addDrivingForDollars,
                        text: t(path('DrivingForDollars')),
                        icon: 'money',
                        onClick: () =>
                          openDialog({
                            id: 'ConfirmationDialog',
                            props: {
                              text: t(path('DrivingForDollarsText')),
                              title: t(path('DrivingForDollarsTitle')),
                              buttons: [
                                {
                                  text: confirmString,
                                  icon: 'done',
                                  onClick: () =>
                                    AddressServices.saveMotivation(rowData.id, {
                                      userId: sessionUser.id,
                                      customerId: sessionUser.id,
                                      motivation: motivationForDollars as unknown as Motivation,
                                      motivationSource: customerMotivationSource,
                                      notes,
                                    }).then(() => {
                                      Alert.info(t(path('DrivingForDollarAdd')));
                                      closeDialog('ConfirmationDialog');
                                    }),
                                },
                              ],
                            },
                          }),
                      },
                      {
                        text: t(path('StopAllMailing')),
                        hide: !permit.stopMailing,
                        icon: 'forbidden',
                        onClick: () =>
                          openDialog({
                            id: 'ConfirmationDialog',
                            props: {
                              text: t(path('StopAllMailingText')),
                              title: t(path('StopAllMailing')),
                              buttons: [
                                {
                                  text: confirmString,
                                  icon: 'done',
                                  onClick: () => handleStopMailing(rowData.id, 'S'),
                                },
                              ],
                            },
                          }),
                      },
                      {
                        text: t(path('OnlySkipTracing')),
                        hide: !permit.onlySkipTracing,
                        icon: 'searchPerson',
                        onClick: () =>
                          openDialog({
                            id: 'ConfirmationDialog',
                            props: {
                              text: t(path('OnlySkipTracingText')),
                              title: t(path('OnlySkipTracing')),
                              buttons: [{ text: confirmString, icon: 'done', onClick: () => handleStopMailing(rowData.id, 'R') }],
                            },
                          }),
                      },
                      {
                        icon: 'cancel',
                        text: t('Common.Close'),
                        onClick: () => closeDialog('AddressDetailDialog'),
                        variant: 'error',
                      },
                    ],
                  },
                })
              }
            />
          </Section>
        )}
        {(!tableHasData || addressListIsLoading) && (
          <UserFeedback variant={feedback.variant} message={feedback.message} maxWidth="1300px" />
        )}
      </div>
    </StyledTakeOffLists>
  );
}
