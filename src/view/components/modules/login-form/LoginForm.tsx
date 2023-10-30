/* eslint-disable @typescript-eslint/no-unused-vars */
import { useTranslation } from 'react-i18next';
import { Form, InputText, InputPassword, Button } from '../..';
import { object, string } from 'yup';
import { useTranslationPath } from '../../../../utils/hooks';
import { useContext, useRef, useState } from 'react';
import { LoginFormTypes } from './LoginForm.types';
import './LoginForm.scss';
import { Alert, TranslationHelper } from '../../../../utils/helpers';
import { FormRef } from '../form-group/form/Form.types';
import { AuthServices } from '../../../../apis/services';
import Constants from '../../../../utils/constants/Constants';
import { SignInPayload } from '../../../../apis/services/auth-services/Auth.services.types';
import { UserSessionContext } from '../../../../contexts/modules/user-session/UserSessionContext';

const { yup } = TranslationHelper;

export default function LoginForm({ onSubmitSuccess, buttonsPortal }: LoginFormTypes) {
  const { setIsSessionExpired, handleLoginSuccess, setIsSessionChecked } = useContext(UserSessionContext);

  const [isFormDisabled, setIsDisabledForm] = useState(false);
  const { t } = useTranslation();
  const loginPath = useTranslationPath('Pages.Login');

  const schema = object().shape({
    username: string().required(yup.requiredField),
    password: string().required(yup.requiredField),
  });

  function onSubmit(payload: SignInPayload) {
    setIsDisabledForm(true);
    AuthServices.loginIM({
      payload,
      onSuccess: async (res) => {
        handleLoginSuccess(res, onSubmitSuccess, 'dashboard');
      },
      onComplete: () => {
        setIsSessionExpired(false);
        setIsDisabledForm(false);
        setIsSessionChecked(true);
      },
      onError: (e) => {
        //  TODO: REMOVE on Release 20 - Start
        if (e === Constants.HTTP_STATUS.BAD_REQUEST) {
          Alert.error(t('Pages.Login.LoginForm.WrongCredentials'));
        }
        //  TODO: REMOVE on Release 20 - end
      },
      errorHandling: [
        { code: Constants.HTTP_STATUS.UNAUTHORIZED, handler: () => Alert.error(t('Pages.Login.LoginForm.WrongPassword')) },
        { code: Constants.HTTP_STATUS.NOT_FOUND, handler: () => Alert.error(t('Pages.Login.LoginForm.WrongUsername')) },
        { code: Constants.HTTP_STATUS.INTERNAL_SERVER_ERROR, handler: () => Alert.error(t('Pages.Login.LoginForm.WrongCredentials')) },
      ],
    });
  }

  const formRef = useRef<FormRef>(null);

  return (
    <Form
      formName="login"
      onSubmit={onSubmit}
      schema={schema}
      buttonsAlignment="center"
      disabled={isFormDisabled}
      className="im-login-form"
      width="100%"
      submitOnEnter
      defaultSubmit={false}
      ref={formRef}
    >
      <div className="im-login-form-fields">
        <InputText
          label={t(loginPath('LoginForm.Username'))}
          name="username"
          placeholder={t(loginPath('LoginForm.UsernamePlaceholder'))}
          showHeader={false}
        />
        <InputPassword
          label={t(loginPath('LoginForm.Password'))}
          name="password"
          placeholder={t(loginPath('LoginForm.PasswordPlaceholder'))}
        />
        <Button
          loading={isFormDisabled}
          text={t('Common.Submit')}
          stopPropagation
          preventDefault
          icon="done"
          className="im-login-submit"
          onClick={() => formRef.current?.submitForm()}
          usePortal={buttonsPortal}
        />
      </div>
    </Form>
  );
}
