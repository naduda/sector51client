export enum EAbonementType {
  MORNING = 'MORNING',
  UNLIMITED = 'UNLIMITED',
  EVENING = 'EVENING',
}

export const ABONEMENT_TYPES_MAP = new Map<EAbonementType, string>([
  [EAbonementType.MORNING, 'Morning'],
  [EAbonementType.UNLIMITED, 'Unlimited'],
  [EAbonementType.EVENING, 'Evening']
]);

export interface IAbonementType {
  value: EAbonementType;
  label: string;
}

export interface IAbonementPeriod {
  value: number;
  label: string;
}

export const ABONEMENT_SERVICE_ID_CALCULATOR = {
  [EAbonementType.MORNING]: {
    1: 3,
    3: 6,
    6: 9,
    12: 12,
  },
  [EAbonementType.UNLIMITED]: {
    1: 0,
    3: 5,
    6: 8,
    12: 11,
  },
  [EAbonementType.EVENING]: {
    1: 4,
    3: 7,
    6: 10,
    12: 13,
  },
};
