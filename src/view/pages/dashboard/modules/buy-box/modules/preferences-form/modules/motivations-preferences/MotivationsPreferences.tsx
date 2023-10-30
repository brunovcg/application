import { ForwardedRef, forwardRef, memo, useCallback, useContext, useEffect, useState, useImperativeHandle } from 'react';
import { Grid, Section, Slider } from '../../../../../../../../components';
import './MotivationsPreferences.scss';
import { useTranslation } from 'react-i18next';
import { useTranslationPath } from '../../../../../../../../../utils/hooks';
import { Alignment, GridTemplateArgs } from '../../../../../../../../components/modules/grid/Grid.types';
import { FormContext } from '../../../../../../../../components/modules/form-group/form/Form';
import { MotivationsPreferencesProps, MotivationsPreferencesRef } from './MotivationsPreferences.types';
import { DataHelper } from '../../../../../../../../../utils/helpers';
import { calculateWeightedAverage } from '../../../../../../../../../apis/queries/user/functions';

const { updateArrayOfObject } = DataHelper;

function MotivationsPreferences({ data }: MotivationsPreferencesProps, ref: ForwardedRef<MotivationsPreferencesRef>) {
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.BuyBox.PreferencesForm.Motivations');
  const [motivations, setMotivations] = useState(data ?? []);
  const { setValue } = useContext(FormContext);

  const changeMotivations = useCallback((motivationName: string, priority: number, rowValue: number) => {
    setMotivations((state) =>
      updateArrayOfObject({
        state,
        objectKeyFilter: 'name',
        comparisonField: motivationName,
        newValues: {
          priority,
          effectiveValue: calculateWeightedAverage({ value: rowValue, middlePoint: 100, priority }),
        },
        callback: (newState) => setValue('motivationPriorities', newState),
      })
    );
  }, []);

  useImperativeHandle(ref, () => ({ changeMotivations }), []);

  useEffect(() => {
    setMotivations(data ?? []);
    setValue('motivationPriorities', data);
  }, data);

  const motivationGridColumns = [
    {
      id: 1,
      accessor: 'formattedName',
      component: t(path('Motivation')),
      cellAlignment: 'left' as Alignment,
      template: ({ value }: GridTemplateArgs) => <p>{value}</p>,
    },
    {
      id: 2,
      accessor: 'priority',
      component: t(path('Priority')),
      template: ({ row }: GridTemplateArgs) => (
        <div style={{ flex: '1' }}>
          <Slider
            min={0}
            max={400}
            step={1}
            width="100%"
            initialValue={row.initialPriority}
            valid={(inputValue) => row.initialPriority !== inputValue}
            onChange={(inputValue) => changeMotivations(row.name, Number(inputValue) as number, row.value)}
            showInputArrows={false}
            percent
          />
        </div>
      ),
    },
    { id: 3, accessor: 'value', component: t(path('Value')) },
    {
      id: 4,
      accessor: 'effectiveValue',
      component: t(path('EffectiveValue')),
      template: ({ value }: GridTemplateArgs) => <div>{value ?? '0.00'}</div>,
    },
  ];

  return (
    <Section sectionTitle={t(path('Title'))} contentClassName="im-preferences-motivations" width="100%">
      <Grid columns={motivationGridColumns} rows={motivations} width="100%" height="400px" rowPK="name" />
    </Section>
  );
}

export default memo(forwardRef(MotivationsPreferences));
