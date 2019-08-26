interface Card {
  readonly fire_date: string
  readonly gen_main: string
  readonly gen_sub0: string
  readonly gen_sub1: string
  readonly gen_sub2: string
  readonly get_date: string
  readonly hire_limit_date: string
  readonly idx: string
  readonly number: string
  readonly pocket: string
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface MemberData {
  readonly ACTIVE_JEWEL: readonly any[]
  readonly BGM_CARD: readonly any[]
  readonly CARD: readonly Card[]
  readonly DATA: readonly { readonly code: string }[]
  readonly GENERAL_COUNT: readonly {
    readonly count: string
    readonly idx: string
  }[]
  readonly PASSIVE_JEWEL: readonly any[]
  readonly STATUS: readonly any[]
  readonly TACTICS: readonly any[]
}
/* eslint-enable @typescript-eslint/no-explicit-any */
