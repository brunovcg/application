import { array, mixed, object, string } from 'yup';
import { DataHelper, TranslationHelper } from '../../../../../../../utils/helpers';

const { yup } = TranslationHelper;
const { mbToBytes, stringifyFromByte } = DataHelper;

const attachmentsMaxSize = mbToBytes(20);

export const supportTicketSchema = object().shape({
  customerRequestType: array().min(1, yup.atLeastNumberSelection(1)).required(yup.requiredField),
  hotSheetService: object(),
  ticketNotes: string().required(yup.requiredField),
  requestedEffectiveDate: array().required(yup.requiredField).length(1, yup.requiredField),
  markets: array().min(1, yup.atLeastNumberSelection(1)).required(yup.requiredField),
  attachments: array()
    .of(mixed())
    .test('fileSize', yup.maxSizePerFile(stringifyFromByte(attachmentsMaxSize)), (files) => {
      if (!(files as Array<unknown>)?.length) {
        return true;
      }

      return files?.every((file) => (file as File).size <= attachmentsMaxSize);
    }),
});
