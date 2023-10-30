import { ZipCodePrioritiesMapped } from '../../../../../../../../../apis/queries/user/types';

export type ZipCodeRef = {
  changeZipCode: (newValue: string, zipCode: number) => void;
};

export type ZipCodeProps = { data?: ZipCodePrioritiesMapped[] };
