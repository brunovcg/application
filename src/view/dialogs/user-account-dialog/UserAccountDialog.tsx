import { useTranslation } from 'react-i18next';
import { Container, Form, InputText, RadioGroup, SelectorUSStates, Title, Dialog, Row } from '../../components';
import Constants from '../../../utils/constants/Constants';
import { useTranslationPath } from '../../../utils/hooks';
import './UserAccountDialog.scss';
import { UserAccountDialogProps } from './UserAccountDialog.types';
import { UserServices } from '../../../apis/services';
import { useContext, useMemo, useRef, useState } from 'react';
import { FormSchema, FormRef } from '../../components/modules/form-group/form/Form.types';
import { registerInternalSchema } from './schemas/registerInternal.schema';
import { registerCustomerSchema } from './schemas/registerCustomer.schema';
import { MaskHelper } from '../../../utils/helpers';
import { USState } from '../../../apis/services/states-services/States.services.types';
import { myAccountCustomerSchema } from './schemas/myAccountCustomer.schema';
import { myAccountInternalSchema } from './schemas/myAccountInternal.schema';
import { userQueries } from '../../../apis/queries';
import useCasesUserAccount from './UserAccounts.useCases';
import { DialogButtons } from '../../components/modules/dialog/Dialog.types';
import { updateCustomerSchema } from './schemas/updateCustomer.schema';
import { updateInternalSchema } from './schemas/updateInternal.schema';
import { UserSessionContext } from '../../../contexts/modules/user-session/UserSessionContext';

const { INTERNAL_USER, CUSTOMER } = Constants.USER.TYPES;
const { zipCodeMask, onlyNumbersMask } = MaskHelper.input;
const { useGetCustomerQuery } = userQueries;

export default function UserAccountDialog({ instance, userToUpdate }: UserAccountDialogProps) {
  const { sessionUser } = useContext(UserSessionContext);
  const { t } = useTranslation();
  const path = useTranslationPath('Dialogs.UserAccountDialog');
  const { customer, customerIsLoading } = useGetCustomerQuery(userToUpdate?.email ?? '');
  const isMyAccount = instance === 'myAccount';
  const isRegister = instance === 'register';

  const initialValues = useMemo(() => {
    if (userToUpdate) {
      return {
        username: userToUpdate.email,
        name: userToUpdate.name,
        isCustomer: userToUpdate.userType === CUSTOMER,
        phone: customer.phone,
        state: [customer.state],
        streetName: customer.streetName,
        zipCode: customer.zipCode,
        city: customer.city,
      };
    }
    if (isMyAccount) {
      return {
        username: sessionUser?.username,
        name: sessionUser?.name,
        isCustomer: sessionUser?.isCustomer,
        phone: sessionUser?.phone,
        state: [sessionUser?.state as USState],
        streetName: sessionUser?.streetName,
        zipCode: sessionUser?.zipCode,
        city: sessionUser?.city,
      };
    }
    return {};
  }, [sessionUser, customer, userToUpdate]);

  const [isCustomer, setIsCustomer] = useState(initialValues.isCustomer ?? true);
  const [isLoading, setIsLoading] = useState(false);

  const submit = useCasesUserAccount({ setNotLoading: () => setIsLoading(false), instance, userToUpdate });

  const formTitle = {
    register: t(path('RegisterUserTitle')),
    myAccount: t(path('UserAccountTitle')),
    userAccount: t(path('UpdateAccountTitle')),
  };

  const formRef = useRef<FormRef>(null);

  const handleFormSchema = () => {
    if (isMyAccount) {
      return isCustomer ? myAccountCustomerSchema : myAccountInternalSchema;
    } else if (isRegister) {
      return isCustomer ? registerCustomerSchema : registerInternalSchema;
    }
    return isCustomer ? updateCustomerSchema : updateInternalSchema;
  };

  const checkAvailableUsername = async (value?: string) => {
    if (value && userToUpdate?.email !== value) {
      const res = await UserServices.getCustomer(value);

      if (res?.username) {
        formRef.current?.setError('username', { type: 'custom', message: t(path('EmailConflict')) });
      } else {
        formRef.current?.trigger('username');
      }
    }
  };

  const title = {
    myAccount: t(path('Title.MyAccount')),
    userAccount: t(path('Title.UpdateUserData'), { user: userToUpdate?.name }),
    register: t(path('Title.RegisterUser')),
  };

  const content = (
    <Container className="im-user-account-dialog" width="100%">
      <Title icon="form" text={formTitle[`${instance}`]} marginBottom="10px" />
      <Form
        formName="user-account"
        className="im-user-account-form"
        schema={handleFormSchema() as FormSchema}
        onSubmit={(data) => {
          setIsLoading(true);
          submit(data);
        }}
        defaultSubmit={false}
        ref={formRef}
      >
        {isRegister && (
          <RadioGroup
            headerEqualizer
            className="im-user-account-margin"
            label={t(path('UserType'))}
            disabled={isLoading}
            width="260px"
            row
            name="userType"
            onChange={() => setIsCustomer((state) => !state)}
            options={[
              { id: CUSTOMER, label: t(path('Customer')), checked: isCustomer },
              { id: INTERNAL_USER, label: t('Common.Internal'), checked: !isCustomer },
            ]}
          />
        )}
        <InputText
          initialValue={initialValues?.username}
          name="username"
          label={t(path('Email'))}
          width="260px"
          onBlur={checkAvailableUsername}
          disabled={isMyAccount || isLoading}
          maxLength={255}
        />
        <InputText
          name="name"
          width="260px"
          maxLength={255}
          label={t(path('Name'))}
          dataTestId="im-my-account-name"
          initialValue={initialValues.name}
          disabled={isLoading}
        />
        {isCustomer && (
          <>
            <InputText
              name="phone"
              width="260px"
              maxLength={10}
              label={t(path('Phone'))}
              maskFunction={onlyNumbersMask}
              initialValue={initialValues.phone}
              disabled={isLoading || customerIsLoading}
            />
            <InputText
              maxLength={255}
              name="streetName"
              width="260px"
              label={t(path('StreetName'))}
              initialValue={initialValues.streetName}
              disabled={isLoading || customerIsLoading}
            />
            <InputText
              name="city"
              maxLength={255}
              width="260px"
              label={t(path('City'))}
              initialValue={initialValues.city}
              disabled={isLoading || customerIsLoading}
            />
            <Row gap={[20]} align="flex-end" wrap>
              <SelectorUSStates name="state" width="260px" initialStates={initialValues.state} disabled={isLoading || customerIsLoading} />
              <InputText
                maxLength={5}
                name="zipCode"
                width="260px"
                label={t(path('ZipCode'))}
                maskFunction={zipCodeMask}
                initialValue={initialValues.zipCode}
                disabled={isLoading || customerIsLoading}
              />
            </Row>
          </>
        )}
      </Form>
    </Container>
  );

  const buttons: DialogButtons = [
    {
      type: 'submit',
      text: t('Common.Submit'),
      icon: 'done',
      onClick: () => formRef.current?.submitForm(),
      loading: isLoading,
    },
  ];

  return <Dialog dialogId="UserAccountDialog" title={title[`${instance}`]} buttons={buttons} width="650px" content={content} />;
}
