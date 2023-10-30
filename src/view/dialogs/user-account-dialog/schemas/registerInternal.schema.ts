import { object, string } from 'yup';
import { TranslationHelper } from '../../../../utils/helpers';
import Constants from '../../../../utils/constants/Constants';

const { yup } = TranslationHelper;
const { IS_EMAIL } = Constants.REGEX;

export const registerInternalSchema = object().shape({
  username: string().matches(IS_EMAIL, yup.invalidEmail).required(yup.requiredField),
  userType: object()
    .required(yup.requiredField)
    .shape({
      id: string().required(yup.requiredField),
      label: string().required(yup.requiredField),
    }),
  name: string().required(yup.requiredField),
});
