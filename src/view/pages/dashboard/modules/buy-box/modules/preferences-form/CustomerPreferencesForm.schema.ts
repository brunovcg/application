import { object, string, number, array } from 'yup';

const schema = object().shape({
  countyId: number(),
  step: string(),
  username: string(),
  categoriesWeight: object().shape({
    livingArea: number(),
    lotSize: number(),
    ltv: number(),
    ownerType: number(),
    propertyType: number(),
    totalValue: number(),
    yearsOld: number(),
    yrsOwned: number(),
    zipCode: number(),
  }),
  livingAreaPriorities: object().shape({
    sfh: array().of(object().shape({ id: number(), propertyType: string(), livingArea: number(), priority: number() })),
    condo: array().of(object().shape({ id: number(), propertyType: string(), livingArea: number(), priority: number() })),
    commercial: array().of(object().shape({ id: number(), propertyType: string(), livingArea: number(), priority: number() })),
    land: array().of(object().shape({ id: number(), propertyType: string(), livingArea: number(), priority: number() })),
    others: array().of(object().shape({ id: number(), propertyType: string(), livingArea: number(), priority: number() })),
    units: array().of(object().shape({ id: number(), propertyType: string(), livingArea: number(), priority: number() })),
  }),

  lotSizePriorities: object().shape({
    sfh: array().of(object().shape({ id: number(), propertyType: string(), lotSize: number(), priority: number() })),
    condo: array().of(object().shape({ id: number(), propertyType: string(), lotSize: number(), priority: number() })),
    commercial: array().of(object().shape({ id: number(), propertyType: string(), lotSize: number(), priority: number() })),
    land: array().of(object().shape({ id: number(), propertyType: string(), lotSize: number(), priority: number() })),
    others: array().of(object().shape({ id: number(), propertyType: string(), lotSize: number(), priority: number() })),
    units: array().of(object().shape({ id: number(), propertyType: string(), lotSize: number(), priority: number() })),
  }),

  totalValuePriorities: object().shape({
    sfh: array().of(object().shape({ id: number(), totalValue: string(), lotSize: number(), priority: number() })),
    condo: array().of(object().shape({ id: number(), totalValue: string(), lotSize: number(), priority: number() })),
    commercial: array().of(object().shape({ id: number(), totalValue: string(), lotSize: number(), priority: number() })),
    land: array().of(object().shape({ id: number(), totalValue: string(), lotSize: number(), priority: number() })),
    others: array().of(object().shape({ id: number(), totalValue: string(), lotSize: number(), priority: number() })),
    units: array().of(object().shape({ id: number(), totalValue: string(), lotSize: number(), priority: number() })),
  }),
  ltvPriorities: object().shape({
    '-1': object().shape({ ltv: number(), priority: number() }),
    '0': object().shape({ ltv: number(), priority: number() }),
    '50': object().shape({ ltv: number(), priority: number() }),
    '70': object().shape({ ltv: number(), priority: number() }),
    '85': object().shape({ ltv: number(), priority: number() }),
    '100': object().shape({ ltv: number(), priority: number() }),
  }),

  motivationPriorities: array().of(
    object().shape({
      id: number().nullable(),
      name: string(),
      motivationId: number(),
      priority: number(),
      value: number(),
      countyId: number(),
    })
  ),
  ownerTypePriorities: object().shape({
    individual: object().shape({ ownerType: string(), priority: number() }),
    trust: object().shape({ ownerType: string(), priority: number() }),
    estate: object().shape({ ownerType: string(), priority: number() }),
    company: object().shape({ ownerType: string(), priority: number() }),
    noClassification: object().shape({ ownerType: string(), priority: number() }),
  }),
  propertyTypePriorities: object().shape({
    sfh: object().shape({ ownerType: string(), priority: number() }),
    units: object().shape({ ownerType: string(), priority: number() }),
    condo: object().shape({ ownerType: string(), priority: number() }),
    commercial: object().shape({ ownerType: string(), priority: number() }),
    land: object().shape({ ownerType: string(), priority: number() }),
    others: object().shape({ ownerType: string(), priority: number() }),
  }),
  yearsOldPriorities: object().shape({
    '-1': object().shape({ ltv: number(), priority: number() }),
    '0': object().shape({ ltv: number(), priority: number() }),
    '3': object().shape({ ltv: number(), priority: number() }),
    '6': object().shape({ ltv: number(), priority: number() }),
    '10': object().shape({ ltv: number(), priority: number() }),
    '20': object().shape({ ltv: number(), priority: number() }),
    '40': object().shape({ ltv: number(), priority: number() }),
    '60': object().shape({ ltv: number(), priority: number() }),
    '100': object().shape({ ltv: number(), priority: number() }),
  }),
  yrsOwnedPriorities: object().shape({
    '-1': object().shape({ yrsOwned: number(), priority: number() }),
    '0': object().shape({ yrsOwned: number(), priority: number() }),
    '2': object().shape({ yrsOwned: number(), priority: number() }),
    '5': object().shape({ yrsOwned: number(), priority: number() }),
    '8': object().shape({ yrsOwned: number(), priority: number() }),
    '15': object().shape({ yrsOwned: number(), priority: number() }),
    '25': object().shape({ yrsOwned: number(), priority: number() }),
  }),
  zipCodePriorities: array().of(object().shape({ zipCode: string(), city: string(), priority: number() })),
});

export default schema;
