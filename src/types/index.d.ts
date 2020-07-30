import type {
  BaseData,
  MemberData,
} from '@boushi-bird/3594t-net-datalist/read-only';

declare global {
  let configDefines: { [key: string]: string };

  /* eslint-disable camelcase */
  interface Window {
    base_data: BaseData;
    member_data: MemberData;
    member_card_fire_date: { date: string; index: string }[];
  }
  /* eslint-enable camelcase */
}
