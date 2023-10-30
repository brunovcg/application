import { useTranslation } from 'react-i18next';
import { Button, ControlledTable, InputText, Section, UserFeedback, SelectorUSStates, Selector, ListRow } from '../../../../components';
import StyledAddressLookup from './AddressLookup.styled';
import { useTranslationPath, useOnKeyPress, useAbortSignal } from '../../../../../utils/hooks';
import { countiesQueries } from '../../../../../apis/queries';
import { useCallback, useContext, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { AddressServices } from '../../../../../apis/services';
import { MappedCountyByState } from '../../../../../apis/queries/counties/types';
import { TableCell, TableColumn } from '../../../../components/modules/table/root-component/Table.types';
import { DataHelper, IMMarketHelper } from '../../../../../utils/helpers';
import { USState } from '../../../../../apis/services/states-services/States.services.types';
import { SelectorRef } from '../../../../components/modules/form-group/selector/Selector.types';
import useAddressLookupPermissions from './AddressLookup.permissions';
import { Address } from '../../../../../apis/services/address-services/Address.services.types';
import { DialogsContext } from '../../../../../contexts/modules/dialogs/DialogsContext';

const { useListCountiesByStatesQuery } = countiesQueries;
const { getCountyName, getStateName } = IMMarketHelper;

export default function AddressLookup() {
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.AddressLookup');
  const { openDialog, closeDialog } = useContext(DialogsContext);
  const [selectedStates, setSelectedStates] = useState<USState[]>([]);
  const permit = useAddressLookupPermissions();

  const searchCriteriaOptions = {
    [t(path('TaxNumber'))]: 'tax-id',
    [t(path('LastName'))]: 'last-name',
    [t(path('FirstName'))]: 'first-name',
    [t(path('PropertyAddress'))]: 'property',
    [t(path('MailingAddress'))]: 'mailing',
  } as const;

  const countyRef = useRef<SelectorRef>(null);

  const [selectedSearchCriteria, setSelectedSearchCriteria] = useState<keyof typeof searchCriteriaOptions | ''>('');
  const [selectedCounties, setSelectedCounties] = useState<MappedCountyByState['statesCounties']>([]);
  const { statesCountiesNames, statesCountiesIsLoading } = useListCountiesByStatesQuery(selectedStates);

  const [typedSearch, setTypedSearch] = useState('');
  const [tableData, setTableData] = useState<Address[]>([]);
  const [enabledButton, setEnabledButton] = useState(false);
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const [requestAborted, setRequestAborted] = useState(false);

  const { signal, abortSignal } = useAbortSignal();

  const tableHasData = !!tableData?.length;

  const tableColumn: TableColumn<Address>[] = [
    {
      Header: t(path('OwnerLastName')),
      accessor: 'ownerLastName',
      alignment: 'left' as const,
      width: 100,
      Filter: true,
    },
    {
      Header: t(path('OwnerFirstName')),
      accessor: 'ownerFirstName',
      width: 100,
      Filter: true,
    },
    {
      Header: t(path('SecondOwnerLastName')),
      accessor: 'owner2LastName',
      alignment: 'left',
      width: 100,
      Filter: true,
    },
    {
      Header: t(path('SecondOwnerFirstName')),
      accessor: 'owner2FirstName',
      width: 100,
      Filter: true,
    },
    {
      Header: t(path('TaxId')),
      accessor: 'taxId',
      width: 120,
      Filter: true,
    },
    {
      Header: t(path('Address')),
      accessor: 'propertyAddress',
      alignment: 'left',
      width: 200,
      Filter: true,
    },
    {
      Header: t(path('County')),
      accessor: 'county',
      width: 100,
      Filter: true,
    },
    {
      Header: t(path('State')),
      accessor: 'state',
      width: 60,
      Filter: true,
    },

    {
      Header: t(path('MailingAddress')),
      width: 200,
      Cell: ({ row }: TableCell<Address>) => (
        <>
          {row.original.mailingAddress}, {row.original.mailingCity} - {row.original.mailingState}
        </>
      ),
    },
  ];

  const handleSearch = useCallback(() => {
    if (!enabledButton) {
      return;
    }
    setIsLoadingTable(true);
    AddressServices.lookupSearch(
      searchCriteriaOptions[selectedSearchCriteria as keyof typeof searchCriteriaOptions],
      typedSearch,
      selectedStates.toString(),
      selectedCounties.map((stateCounty) => getCountyName(stateCounty)).toString(),
      signal
    )
      .then((res) => setTableData(res))
      .catch(() => {})
      .finally(() => setIsLoadingTable(false));
    setEnabledButton(false);
  }, [enabledButton, selectedSearchCriteria, typedSearch, selectedStates, selectedCounties]);

  useOnKeyPress({ keys: ['Enter'], callback: handleSearch, enabled: enabledButton });

  const handleStateChange = (statesValues: USState[]) => {
    const updatedCounties = selectedCounties.filter((stateCounty) => statesValues.includes(getStateName(stateCounty) as USState));
    setSelectedCounties(updatedCounties);
    countyRef.current?.updateValue(updatedCounties);
    setRequestAborted(false);
    if (!statesValues.length) {
      setSelectedStates(statesValues);
    }
  };

  useLayoutEffect(() => {
    if (selectedCounties?.length && typedSearch && selectedSearchCriteria) {
      setEnabledButton(true);
    } else {
      setEnabledButton(false);
    }
    setTableData([]);
    setRequestAborted(false);
  }, [selectedCounties?.length, typedSearch, selectedSearchCriteria]);

  const countiesRenderer = (countiesStatesList: MappedCountyByState['statesCounties'], stateName: string) => {
    const mappedData = DataHelper.filterMap(
      countiesStatesList,
      (stateCounty) => stateCounty.startsWith(stateName),
      (stateCounty) => ({ display: getCountyName(stateCounty) })
    );

    if (!mappedData.length) {
      return <span className="im-current-county-selection-none">{t('Common.None')}</span>;
    }

    return <span className="im-current-county-selection">{<ListRow list={mappedData} color="primary" />}</span>;
  };

  const pageMaxWidth = '1400px';

  const feedback = useMemo(() => {
    if (isLoadingTable) {
      return { variant: 'loading' as const };
    }

    if (requestAborted) {
      return { variant: 'error' as const, message: t(path('RequestAborted')) };
    }
    if (!selectedStates.length) {
      return { variant: 'warning' as const, message: t(path('SelectStates')) };
    }
    if (!selectedCounties.length) {
      return { variant: 'warning' as const, message: t(path('SelectCounties')) };
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
  }, [isLoadingTable, requestAborted, selectedStates, selectedCounties, selectedSearchCriteria, typedSearch, enabledButton]);

  return (
    <StyledAddressLookup className="im-address-lookup">
      <Section contentClassName="im-address-lookup-filters" icon="filter" sectionTitle={t(path('SearchFilters'))} maxWidth={pageMaxWidth}>
        <SelectorUSStates
          onSelect={(value) => {
            setSelectedStates(value);
            handleStateChange(value);
          }}
          showError={false}
          multiple
          width="250px"
        />
        <Selector
          ref={countyRef}
          options={statesCountiesNames ?? []}
          loading={statesCountiesIsLoading}
          disabled={isLoadingTable || !selectedStates.length}
          label={t(path('CountiesOfInterest'))}
          multiple
          maxWidth="220px"
          onSelect={setSelectedCounties as (value: unknown[]) => void}
          showError={false}
          placeholder={!selectedStates.length ? t(path('SelectStates')) : ''}
          testInstance="county-select"
        />
        <Selector
          options={Object.keys(searchCriteriaOptions) as (keyof typeof searchCriteriaOptions | '')[]}
          disabled={isLoadingTable}
          label={t(path('SearchCriteria'))}
          maxWidth="210px"
          onSelect={(value) => setSelectedSearchCriteria(value[0] as keyof typeof searchCriteriaOptions | '')}
          testInstance="criteria-select"
          allowSearch={false}
          showError={false}
        />
        <InputText
          label={t(path('SearchValue'))}
          maxWidth="180px"
          onChange={setTypedSearch}
          disabled={isLoadingTable || !selectedSearchCriteria}
          dataTestId="im-address-lookup-search"
          showError={false}
        />
        <Button
          dataTestId="im-address-lookup-search-button"
          text={t('Common.Search')}
          icon="search"
          onClick={handleSearch}
          disabled={!enabledButton}
        />
        {isLoadingTable && (
          <Button
            icon="cancel"
            text={t('Common.Abort')}
            variant="error"
            onClick={() => {
              setRequestAborted(true);
              abortSignal();
            }}
          />
        )}
      </Section>
      <div className="im-address-lookup-feedback-wrapper">
        {!!selectedStates.length && (
          <Section
            className="im-current-county-state-section"
            contentClassName="im-current-county-state-section-content"
            sectionTitle={t(path('CountyState'))}
            maxWidth={pageMaxWidth}
            icon="location"
          >
            {selectedStates?.map((state) => (
              <div key={state} className="im-state-wrapper">
                <strong className="im-current-state-selection">{state}</strong>
                {' : '}
                <span>{countiesRenderer(selectedCounties, state)}</span>
              </div>
            ))}
          </Section>
        )}
        {tableHasData && (
          <Section sectionTitle={t(path('SearchResult'))} maxWidth={pageMaxWidth} icon="table">
            <ControlledTable
              className="im-address-lookup-table"
              data={tableData}
              tableWidth="1500px"
              columns={tableColumn}
              paginate={[10, 25, 50, 'All']}
              onRowClick={(rowData) =>
                openDialog({
                  id: 'AddressDetailDialog',
                  props: {
                    data: rowData,
                    buttons: [
                      {
                        hide: !permit.linkInbound,
                        text: t(path('LinkInboundPhoneCall')),
                        icon: 'link',
                        onClick: () =>
                          openDialog({
                            id: 'LinkInboundPhoneCallDialog',
                            props: { id: rowData.id },
                          }),
                      },
                      {
                        hide: !permit.addMotivation,
                        text: t(path('AddMotivation')),
                        icon: 'add',
                        onClick: () => openDialog({ id: 'AddMotivationDialog', props: { id: rowData.id } }),
                      },
                      {
                        text: t('Common.Close'),
                        variant: 'error',
                        icon: 'cancel',
                        onClick: () => closeDialog('AddressDetailDialog'),
                      },
                    ],
                  },
                })
              }
              info={t(path('ClickRow'))}
            />
          </Section>
        )}
        {!tableHasData && <UserFeedback maxWidth={pageMaxWidth} variant={feedback.variant} message={feedback.message} />}
      </div>
    </StyledAddressLookup>
  );
}
