import {
  BaseData,
  MemberData,
} from '@boushi-bird/3594t-net-datalist/read-only';

export { BaseData, MemberData };
export type General = BaseData['GENERAL'][number];
export type Card = MemberData['CARD'][number];
export type State = BaseData['STATE'][number];
export type GenMain = BaseData['GEN_MAIN'][number];
export type GenSub = BaseData['GEN_SUB'][number];
