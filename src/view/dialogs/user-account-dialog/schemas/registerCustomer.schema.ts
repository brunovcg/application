import { object, string, array } from 'yup';
import { TranslationHelper } from '../../../../utils/helpers';
import Constants from '../../../../utils/constants/Constants';

const { yup } = TranslationHelper;
const { IS_EMAIL, ONLY_NUMBERS } = Constants.REGEX;

export const registerCustomerSchema = object().shape({
  username: string().matches(IS_EMAIL, yup.invalidEmail).required(yup.requiredField),
  userType: object()
    .required(yup.requiredField)
    .shape({
      id: string().required(yup.requiredField),
      label: string().required(yup.requiredField),
    }),
  name: string().required(yup.requiredField),
  phone: string().test('zipCode', yup.onlyNumbers, (field) => {
    if (!field) {
      return true;
    }
    return RegExp(ONLY_NUMBERS).test(field);
  }),
  city: string(),
  state: array(),
  streetName: string(),
  zipCode: string()
    .test('zipCode', yup.onlyNumbers, (field) => {
      if (!field) {
        return true;
      }
      return RegExp(ONLY_NUMBERS).test(field);
    })
    .test('zipCode', yup.length(5), (field) => {
      if (!field) {
        return true;
      }
      return field?.length === 5;
    }),
});
