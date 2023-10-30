import { object, string } from 'yup';
import { TranslationHelper } from '../../../utils/helpers';

const { yup } = TranslationHelper;

export const motivationSourcePayload = {
  displayName: string().required(yup.requiredField),
  description: string(),
};

const motivationSourceSchema = object().shape(motivationSourcePayload);

export default motivationSourceSchema;
