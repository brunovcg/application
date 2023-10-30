import { object, ref, string } from 'yup';
import { TranslationHelper } from '../../../../../utils/helpers';
import Constants from '../../../../../utils/constants/Constants';

const { yup } = TranslationHelper;
const { MIN_ONE_UPPERCASE, MIN_ONE_LOWERCASE } = Constants.REGEX;

export const passwordSchema = object().shape({
  password: string()
    .required(yup.requiredField)
    .test('len', yup.minCharacters(10), (value) => value.length >= 10)
    .matches(MIN_ONE_UPPERCASE, yup.oneUpperCase)
    .matches(MIN_ONE_LOWERCASE, yup.oneLowerCase),
  confirmPassword: string()
    .required(yup.requiredField)
    .oneOf([ref('password')], yup.mustMatchPassword),
});
