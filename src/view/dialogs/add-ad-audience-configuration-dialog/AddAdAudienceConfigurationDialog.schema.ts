import { array, object, string } from 'yup';
import TranslationHelper from '../../../utils/helpers/modules/Translation.helper';

const { yup } = TranslationHelper;

export const adSenseConfigurationSchema = object().shape({
  type: array().of(string().required(yup.requiredField)),
  accountId: string().required(yup.requiredField),
  status: string().required(yup.requiredField),
});
