import { object, string } from 'yup';
import { TranslationHelper } from '../../../../utils/helpers';

const { yup } = TranslationHelper;

export const myAccountInternalSchema = object().shape({
  name: string().required(yup.requiredField),
  username: string().required(yup.requiredField),
});
