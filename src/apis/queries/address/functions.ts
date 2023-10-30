import { MotivationSubmissionByAddress } from '../../services/address-services/Address.services.types';

export const mapAddressSubmissions = (address?: MotivationSubmissionByAddress) =>
  address?.addressMotivationMinerSubmissionTestDTOS.map((submission) => ({
    addressId: address.id,
    county: address.county,
    taxId: address.county,
    propertyAddress: address.propertyAddress,
    propertyCity: address.propertyCity,
    propertyState: address.propertyState,
    propertyZip: address.propertyZip,
    mailingAddress: address.mailingAddress,
    mailingCity: address.mailingCity,
    mailingState: address.mailingState,
    mailingZip: address.mailingZip,
    ownerFirstName: address.ownerFirstName,
    ownerLastName: address.ownerLastName,
    ownerMiddleName: address.ownerLastName,
    id: submission.id,
    motivationName: submission.motivationName,
    sourceName: submission.sourceName,
    notes: submission.notes,
    createdDate: submission.createdDate,
    verificationStatus: submission.verificationStatus,
    verificationNote: submission.verificationNote,
  })) ?? [];
