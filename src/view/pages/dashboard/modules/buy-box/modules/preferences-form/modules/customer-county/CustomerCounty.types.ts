import { Dispatch, Ref, SetStateAction } from 'react';
import { OriginalCountyByCustomer } from '../../../../../../../../../apis/queries/counties/types';
import { SelectorRef } from '../../../../../../../../components/modules/form-group/selector/Selector.types';

export type CustomerCountyProps = {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  setCounty: Dispatch<SetStateAction<OriginalCountyByCustomer>>;
  customerRef: Ref<SelectorRef>;
};
