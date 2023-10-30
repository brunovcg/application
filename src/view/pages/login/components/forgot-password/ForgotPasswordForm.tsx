import { useTranslation } from 'react-i18next';
import { Form, InputText, LoadingSpinner, MessageContainer } from '../../../../components';
import StyledForgotPasswordForm from './ForgotPasswordForm.styled';
import { forgotPasswordSchema } from './ForgotPassword.schema';
import { useTranslationPath } from '../../../../../utils/hooks';
import { useState } from 'react';
import { PasswordServices } from '../../../../../apis/services';

export default function ForgotPasswordForm() {
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Login.ForgotPasswordForm');
  const [emailSent, setEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (payload: { username: string }) => {
    setIsLoading(true);
    PasswordServices.sendForgotPasswordEmail({
      username: payload.username,
      onSuccess: () => {
        setEmailSent(true);
        setIsLoading(false);
      },
    });
  };

  return (
    <StyledForgotPasswordForm className="im-forgot-password">
      {!emailSent && !isLoading && (
        <Form formName="forgot-password" width="100%" className="im-forgot-password-form" schema={forgotPasswordSchema} onSubmit={onSubmit}>
          <InputText name="username" label={t(path('Email'))} placeholder={t(path('Placeholder'))} />
        </Form>
      )}
      {emailSent && !isLoading && <MessageContainer variant="info" fontSize="large" text={t(path('EmailSent'))} />}
      {isLoading && <LoadingSpinner message />}
    </StyledForgotPasswordForm>
  );
}
