import { array, object, string } from 'yup';
import { TranslationHelper } from '../../../utils/helpers';

const { yup } = TranslationHelper;

export const motivationSourceGroupsInfoSchema = object().shape({
  description: string(),
  displayName: string().required(yup.requiredField),
});

export const motivationSourceGroupsSourcesSchema = object().shape({
  sources: array(),
});
