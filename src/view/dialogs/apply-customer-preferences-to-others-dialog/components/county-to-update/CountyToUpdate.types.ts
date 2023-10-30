export type CountyToUpdateProps = {
  stateCounty: string;
  apply: boolean;
  onApply: (countyId: number) => Promise<unknown>;
  customerUsername: string;
};
