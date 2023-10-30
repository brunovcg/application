import { OnHTTPResponse } from '../../../utils/http/Http.types';

export type EffectiveDatesResponse = { effectiveDates: string[] };

export type UploadAttachmentResponse = {
  preSignedUrl: string;
};

export type UploadAttachmentArgs = OnHTTPResponse<UploadAttachmentResponse> & {
  payload: FormData;
};

export type CreateTicketPayload = {
  customerRequestType: string[];
  hotSheetService: string;
  ticketNotes: string;
  requestedEffectiveDate: string;
  markets: string[];
  attachments: {
    filename: string;
    url: string;
  }[];
};

export type CreateTicketArgs = OnHTTPResponse<Record<never, never>> & {
  payload: CreateTicketPayload;
};
