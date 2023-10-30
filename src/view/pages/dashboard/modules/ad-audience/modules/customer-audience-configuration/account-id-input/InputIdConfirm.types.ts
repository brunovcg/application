import Constants from '../../../../../../../../utils/constants/Constants';
import { GridTemplateArgs } from '../../../../../../../components/modules/grid/Grid.types';

const { STATUS } = Constants;

export type InputIdConfirmProps = {
  rowData: GridTemplateArgs;
  readOnly: boolean;
  updateConfiguration: (
    adSenseId: number,
    customerId: number,
    payload: {
      status: (typeof STATUS)[keyof typeof STATUS];
      accountId: string;
    }
  ) => void;
};
