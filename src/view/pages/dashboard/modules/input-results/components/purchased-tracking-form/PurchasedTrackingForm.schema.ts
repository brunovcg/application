import { object, string, date, number, array } from 'yup';
import { TranslationHelper } from '../../../../../../../utils/helpers';
import Constants from '../../../../../../../utils/constants/Constants';
const { yup } = TranslationHelper;

const { NOT_NUMBER } = Constants.REGEX;

export const schemaFields = {
  addressSearch: string().required(yup.requiredField),
  purchaseDate: date().required(yup.requiredField),
  profit: string()
    .test('profit', yup.requiredField, (field) => {
      const sanitize = field?.replace(NOT_NUMBER, '') ?? 0;
      return Number(sanitize) > 0;
    })
    .required(yup.requiredField),
  dealSource: array()
    .of(object().shape({ id: number(), label: string(), value: string() }))
    .min(1, yup.atLeastNumberSelection(1)),

  customer: array().of(object()).length(1, yup.requiredField).required(yup.requiredField),
};

export const purchasedTrackingFormSchema = object().shape(schemaFields);
