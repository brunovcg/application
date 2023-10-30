import { array, number, object, string } from 'yup';
import { TranslationHelper } from '../../../utils/helpers';

const { yup } = TranslationHelper;

export const motivationPayload = {
  definition: string().required(yup.requiredField),
  expirationMonths: number().required(yup.requiredField),
  motivationAliasList: array().of(string()).required(yup.requiredField),
  motivationGroup: array(),
  value: number().required(yup.requiredField),
};

const motivationSchema = object().shape(motivationPayload);

export default motivationSchema;
