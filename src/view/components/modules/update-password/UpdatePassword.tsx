import { useTranslationPath } from '../../../../utils/hooks';
import { useTranslation } from 'react-i18next';
import { Form, InputPassword, MessageContainer } from '../..';
import StyledUpdatePassword from './UpdatePassword.styled';
import { passwordSchema } from './schemas/password.schema';
import { UpdatePasswordProps, UpdatePasswordRef } from './UpdatePassword.types';
import { ForwardedRef, forwardRef, useImperativeHandle, useRef } from 'react';
import { FormRef } from '../form-group/form/Form.types';

function UpdatePassword({ onSubmit }: UpdatePasswordProps, ref?: ForwardedRef<UpdatePasswordRef>) {
  const { t } = useTranslation();
  const path = useTranslationPath('Components.UpdatePassword');

  const formRef = useRef<FormRef>(null);

  const submit = () => formRef.current?.submitForm();

  useImperativeHandle(ref, () => ({ submit }));

  const handleSubmit = (payload: { password: string }) => {
    onSubmit(payload, () => formRef.current?.setError('password', { message: t(path('NotAllowed')) }));
  };

  return (
    <StyledUpdatePassword className="im-update-password">
      <Form
        formName="update-password"
        onSubmit={handleSubmit}
        defaultSubmit={!ref}
        schema={passwordSchema}
        className="im-update-password-form"
        submitOnEnter
        ref={formRef}
      >
        <MessageContainer text={t(path('Pattern'))} variant="info" fontSize="medium" />
        <InputPassword label={t(path('NewPassword'))} name="password" />
        <InputPassword label={t(path('ConfirmPassword'))} name="confirmPassword" />
      </Form>
    </StyledUpdatePassword>
  );
}

export default forwardRef(UpdatePassword);
