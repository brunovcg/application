import { array, object, string } from 'yup';
import { TranslationHelper } from '../../../../utils/helpers';
import Constants from '../../../../utils/constants/Constants';

const { yup } = TranslationHelper;

const { ONLY_NUMBERS } = Constants.REGEX;

export const myAccountCustomerSchema = object().shape({
  name: string().required(yup.requiredField),
  phone: string().test('zipCode', yup.onlyNumbers, (field) => {
    if (!field) {
      return true;
    }
    return RegExp(ONLY_NUMBERS).test(field);
  }),
  city: string(),
  state: array().of(string()),
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
