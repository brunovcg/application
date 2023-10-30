import { useTranslation } from 'react-i18next';
import { Button, Form, InputNumber, Section } from '../../../../../../components';
import StyledDefaultParameters from './DefaultParameters.styled';
import { useTranslationPath } from '../../../../../../../utils/hooks';
import { defaultParametersSchema } from './DefaultParameters.schema';
import { parametersQueries } from '../../../../../../../apis/queries';
import { IMParameters, OptionalIMParameters } from '../../../../../../../apis/services/parameters-services/Parameters.services.types';
import { useRef } from 'react';
import { FormRef } from '../../../../../../components/modules/form-group/form/Form.types';
import { DataHelper, Alert } from '../../../../../../../utils/helpers';

const { useGetParametersQuery, useUpdateParametersMutation } = parametersQueries;
const { areObjectsDeepEqual } = DataHelper;

export default function DefaultParameters() {
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.ProcessRunner.DefaultParameters');
  const formRef = useRef<FormRef>(null);
  const { parameters } = useGetParametersQuery();
  const { mutate } = useUpdateParametersMutation();

  const handleSubmit = (payload: OptionalIMParameters) => {
    if (parameters) {
      const parametersToUpdate = { parameters, ...payload };

      if (areObjectsDeepEqual(parameters, parametersToUpdate)) {
        Alert.error(t(path('Error')));
        return;
      }

      mutate({
        params: { id: parameters.id },
        payload: parametersToUpdate,
        onSuccess: () => Alert.info(t(path('Success'))),
        onError: () => Alert.error(t('Common.SystemError')),
      });
    }
  };

  const inputProps = {
    width: '260px',
    min: 0,
    allowClear: false,
    allowReset: true,
  };

  const formatInputProps = (key: keyof IMParameters) => {
    const value = parameters?.[`${key}`];

    let formattedValue: string;

    if (typeof value === 'number') {
      formattedValue = String(value);
    } else {
      formattedValue = value ?? '0';
    }

    return { ...inputProps, key: key, initialValue: formattedValue, name: key, validIfChanged: true };
  };

  return (
    <StyledDefaultParameters>
      <Form onSubmit={handleSubmit} schema={defaultParametersSchema} formName="default-parameters" defaultSubmit={false} ref={formRef}>
        <div className="im-default-parameters-section-wrapper">
          <Section
            className="im-default-parameters-section"
            sectionTitle={t(path('PostCard'))}
            contentClassName="im-default-parameters-section-content"
          >
            <InputNumber {...formatInputProps('postCardAvatar')} label={t(path('Inputs.Avatar'))} />
            <InputNumber {...formatInputProps('postCardCount')} label={t(path('Inputs.Count'))} />
            <InputNumber {...formatInputProps('postCardMotivationPoint')} label={t(path('Inputs.MotivationPoint'))} />
            <InputNumber {...formatInputProps('postCardNumberMonths')} label={t(path('Inputs.NumberOfMonths'))} />
          </Section>
          <Section
            className="im-default-parameters-section"
            sectionTitle={t(path('SkipTrace'))}
            contentClassName="im-default-parameters-section-content"
          >
            <InputNumber {...formatInputProps('skipTraceAvatar')} label={t(path('Inputs.Avatar'))} />
            <InputNumber {...formatInputProps('skipTraceCount')} label={t(path('Inputs.Count'))} />
            <InputNumber {...formatInputProps('skipTraceExpiryDays')} label={t(path('Inputs.SkipTraceExpiry'))} />
            <InputNumber {...formatInputProps('skipTraceMotivationPoint')} label={t(path('Inputs.MotivationPoint'))} />
            <InputNumber {...formatInputProps('skipTraceNotFound')} label={t(path('Inputs.NotFoundThreshold'))} />
          </Section>
        </div>
        <Section width="100%" contentClassName="im-default-preferences-submit">
          <Button text={t('Common.Submit')} icon="done" />
        </Section>
      </Form>
    </StyledDefaultParameters>
  );
}
