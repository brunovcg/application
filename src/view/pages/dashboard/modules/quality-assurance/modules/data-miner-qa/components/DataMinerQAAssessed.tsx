import { useTranslation } from 'react-i18next';
import { ControlledTable, UserFeedback } from '../../../../../../../components';
import useDataMinerQAColumns from '../hooks/data-miner-qa-columns/useDataMinerQAColumns';
import { useTranslationPath } from '../../../../../../../../utils/hooks';
import { useContext } from 'react';
import { DataMinerQAContext } from '../DataMinerQA';

export default function DataMinerQAAssessed() {
  const { addAssessed, assessed } = useContext(DataMinerQAContext);

  const columns = useDataMinerQAColumns({ addAssessed, instance: 'assessed' });
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.QualityAssurance.DataMinerQA.DataMinerQAAssessed');

  if (!assessed.items.length) {
    return <UserFeedback message={t(path('NoData'))} variant="error" />;
  }

  return <ControlledTable tableWidth="100%" columns={columns} data={assessed.items} showGlobalFilter />;
}
