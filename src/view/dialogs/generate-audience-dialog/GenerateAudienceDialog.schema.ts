import { array, mixed, object, string } from 'yup';
import { DataHelper, TranslationHelper } from '../../../utils/helpers';

const { yup } = TranslationHelper;
const { mbToBytes, stringifyFromByte } = DataHelper;

const attachmentsMaxSize = mbToBytes(50);

const audienceSchema = object().shape({
  audienceName: string().required(yup.requiredField),
  adSenseTypes: array().of(string()).required().length(1, yup.requiredField),
  attachment: array()
    .of(mixed())
    .length(1, yup.requiredField)
    .required(yup.requiredField)
    .test('fileSize', yup.maxSizePerFile(stringifyFromByte(attachmentsMaxSize)), (files) => {
      if (!(files as Array<unknown>).length) {
        return true;
      }
      return files?.every((file) => (file as File).size <= attachmentsMaxSize);
    }),
});

export default audienceSchema;
