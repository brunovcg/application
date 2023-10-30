import {
  CalculateWeightedAverageArgs,
  LivingAreaPriorities,
  LivingAreaPrioritiesMapped,
  LotSizePriorities,
  LotSizePrioritiesMapped,
  PropertyTypeNames,
  TotalValuePriorities,
  TotalValuePrioritiesMapped,
} from './types';

export const mapLotSizePriorities = (lotSizeList: LotSizePriorities[]) =>
  [...lotSizeList]
    .sort((current: LotSizePriorities, next: LotSizePriorities) => current.lotSize - next.lotSize)
    ?.reduce((acc: LotSizePrioritiesMapped, current: LotSizePriorities) => {
      const { propertyType, lotSize, id, priority } = current ?? {};
      const index = acc[String(propertyType) as PropertyTypeNames] ? acc[String(propertyType) as PropertyTypeNames].length : 0;
      acc[String(propertyType) as PropertyTypeNames] = [
        ...(acc?.[String(propertyType) as PropertyTypeNames] ?? []),
        { index, lotSize, propertyType, priority, id, initialValue: lotSize, initialPriority: priority },
      ];
      return acc;
    }, {} as LotSizePrioritiesMapped);

export const mapLivingAreaPriorities = (livingAreaList: LivingAreaPriorities[]) =>
  [...livingAreaList]
    .sort((current: LivingAreaPriorities, next: LivingAreaPriorities) => current.livingArea - next.livingArea)
    ?.reduce((acc: LivingAreaPrioritiesMapped, current: LivingAreaPriorities) => {
      const { propertyType, livingArea, id, priority } = current ?? {};
      const index = acc[String(propertyType) as PropertyTypeNames] ? acc[String(propertyType) as PropertyTypeNames].length : 0;
      acc[String(propertyType) as PropertyTypeNames] = [
        ...(acc?.[String(propertyType) as PropertyTypeNames] ?? []),
        { index, livingArea, propertyType, priority, id, initialPriority: priority, initialValue: livingArea },
      ];
      return acc;
    }, {} as LivingAreaPrioritiesMapped);

export const mapTotalValuePriorities = (totalSizeList: TotalValuePriorities[]) =>
  [...totalSizeList]
    .sort((current: TotalValuePriorities, next: TotalValuePriorities) => current.totalValue - next.totalValue)
    ?.reduce((acc: TotalValuePrioritiesMapped, current: TotalValuePriorities) => {
      const { propertyType, totalValue, id, priority } = current ?? {};
      const index = acc[String(propertyType) as PropertyTypeNames] ? acc[String(propertyType) as PropertyTypeNames].length : 0;
      acc[String(propertyType) as PropertyTypeNames] = [
        ...(acc?.[String(propertyType) as PropertyTypeNames] ?? []),
        { index, totalValue, propertyType, priority, id, initialPriority: priority, initialValue: totalValue },
      ];
      return acc;
    }, {} as TotalValuePrioritiesMapped);

export const calculateWeightedAverage = ({ value, middlePoint, priority }: CalculateWeightedAverageArgs) => {
  const weight = priority / middlePoint;
  const effectiveValue = weight * value;
  return effectiveValue.toFixed(2);
};
