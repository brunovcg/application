import { useTranslation } from 'react-i18next';
import Constants from '../../../../../../utils/constants/Constants';
import { Chip } from '../../../../../components';
import { TableCell, TableColumn } from '../../../../../components/modules/table/root-component/Table.types';
import { useTranslationPath } from '../../../../../../utils/hooks';
import { useMemo } from 'react';
import { Address } from '../../../../../../apis/services/address-services/Address.services.types';

export default function useMyLeadsHelper() {
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.MyLeads');
  const { AUDANTIC, NO_SUPPRESSION, RETURNED, MAIL_ONLY, STOP_MAILING } = Constants.STOP_MAILING_FLAGS;

  const columns = useMemo(
    (): TableColumn<Address>[] => [
      {
        Header: t(path('OwnerLastName')),
        accessor: 'ownerLastName',
        width: 150,
        Filter: true,
      },
      {
        Header: t(path('OwnerFirstName')),
        alignment: 'left' as const,
        accessor: 'ownerFirstName',
        width: 220,
        Filter: true,
      },
      {
        Header: t(path('TaxId')),
        accessor: 'taxId',
        width: 100,
        Filter: true,
      },
      {
        Header: t(path('Address')),
        accessor: 'propertyAddress',
        alignment: 'left' as const,
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
        width: 80,
        Filter: true,
      },
      {
        Header: t(path('StopMailingFlag')),
        accessor: 'stopMailingFlag',
        width: 120,
        Cell: ({ value }: TableCell<Address, 'stopMailingFlag'>) => {
          const nullResponse = { text: t(path('NoSuppression')), variant: 'valid' as const };
          const flags = {
            [AUDANTIC]: { text: t(path('Audantic')), variant: 'primary' as const },
            [RETURNED]: { text: t(path('Returned')), variant: 'warning' as const },
            [MAIL_ONLY]: { text: t(path('MailOnly')), variant: 'medium' as const },
            [STOP_MAILING]: { text: t(path('StopMailing')), variant: 'error' as const },
            [NO_SUPPRESSION]: nullResponse,
          };

          const mappedValue = !value ? nullResponse : flags[value as keyof typeof flags];

          return (
            <div className="im-global-centered">
              <Chip size="small" variant={mappedValue?.variant} text={mappedValue?.text} />
            </div>
          );
        },
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
    ],
    []
  );

  return { columns };
}
