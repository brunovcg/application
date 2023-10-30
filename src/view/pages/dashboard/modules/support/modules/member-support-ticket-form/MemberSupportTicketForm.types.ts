export type SupportTicketSubmitForm<Markets, EffectiveDates, RequestTypes, HotSheetService> = {
  ticketNotes: string;
  attachments?: File[];
  customerRequestType: RequestTypes;
  markets: Markets;
  requestedEffectiveDate: EffectiveDates;
  hotSheetService: HotSheetService;
};
