declare module 'local-type' {
  import type {
    BaseData,
    MemberData,
  } from '@boushi-bird/3594t-net-datalist/read-only';

  export type { BaseData, MemberData };
  export type General = BaseData['GENERAL'][number];
  export type Card = MemberData['CARD'][number];
  export type State = BaseData['STATE'][number];
  export type GenMain = BaseData['GEN_MAIN'][number];
  export type GenSub = BaseData['GEN_SUB'][number];

  export interface LabeledCard {
    number: string;
    genMain: GenMain;
    genSubs: GenSub[];
    hireLimitDate: string;
    pocket: boolean;
  }

  export interface LabeledGeneral {
    name: string;
    rarity: string;
    state: State;
    version: string;
    url: string;
    major: string;
    minor: string;
  }

  export interface CardInfo {
    card: LabeledCard | null;
    general: LabeledGeneral | null;
  }
}
