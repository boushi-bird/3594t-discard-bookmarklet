interface Enishi {
  readonly fire_10t: string
  readonly hire: string
  readonly rarity: string
}

interface ExRank {
  readonly code: string
  readonly count: string
  readonly key: string
  readonly name: string
}

interface General {
  readonly add_version: string
  readonly belong: number
  readonly buryoku: string
  readonly chiryoku: string
  readonly code: string
  readonly cost: string
  readonly ex_rank: string
  readonly gen_main0: string
  readonly gen_main1: string
  readonly gen_main2: string
  readonly general_type: string
  readonly illustrator: string
  readonly major_version: string
  readonly not_belong: boolean
  readonly personal: string
  readonly pocket_code: string
  readonly rarity: string
  readonly seiatsu: string
  readonly skill0: string
  readonly skill1: string
  readonly skill2: string
  readonly state: string
  readonly strat: string
  readonly unit_type: string
  readonly ver_type: string
  readonly voice_actor: string
}

interface GeneralType {
  readonly code: string
  readonly key: string
  readonly name: string
}

interface GenMain {
  readonly code: string
  readonly key: string
  readonly name: string
  readonly name_short: string
}

interface GenSub {
  readonly code: string
  readonly name: string
  readonly name_short: string
}

interface Illustrator {
  readonly idx: string
  readonly name: string
}

interface Personal {
  readonly azana: string
  readonly azana_ruby: string
  readonly name: string
  readonly name_ruby: string
}

interface Skill {
  readonly code: string
  readonly key: string
  readonly name: string
  readonly short_name: string
}

interface State {
  readonly blue: string
  readonly code: string
  readonly green: string
  readonly name: string
  readonly name_short: string
  readonly red: string
}

interface Strat {
  readonly code: string
  readonly explanation: string
  readonly key: string
  readonly morale: string
  readonly name: string
  readonly name_ruby: string
  readonly strat_category: string
  readonly strat_range: string
  readonly strat_time: string
}

interface StratCategory {
  readonly code: string
  readonly key: string
  readonly name: string
}

interface StratRange {
  readonly code: string
}

interface StratTime {
  readonly name: string
}

interface UnitType {
  readonly code: string
  readonly key: string
  readonly name: string
}

interface VerType {
  readonly name: string
}

interface VoiceActor {
  readonly idx: string
  readonly name: string
}

export interface BaseData {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  readonly ACTIVE_JEWEL: readonly any[]
  readonly ACTIVE_JEWEL_TYPE: readonly any[]
  readonly BGM: readonly any[]
  /* eslint-enable @typescript-eslint/no-explicit-any */
  readonly COST: {
    readonly [key: number]: { readonly code: string; readonly name: string }
  }
  readonly DATA: readonly { code: string }[]
  readonly ENISHI: readonly Enishi[]
  readonly EXT: readonly any[] // eslint-disable-line @typescript-eslint/no-explicit-any
  readonly EX_RANK: readonly ExRank[]
  readonly GENERAL: readonly General[]
  readonly GENERAL_TYPE: readonly GeneralType[]
  readonly GEN_MAIN: readonly GenMain[]
  readonly GEN_SUB: readonly GenSub[]
  readonly ILLUSTRATOR: readonly Illustrator[]
  /* eslint-disable @typescript-eslint/no-explicit-any */
  readonly PARAM: readonly any[]
  readonly PASSIVE_JEWEL: readonly any[]
  readonly PATH: readonly any[]
  /* eslint-enable @typescript-eslint/no-explicit-any */
  readonly PERSONAL: readonly Personal[]
  readonly RARITY: {
    readonly [key: string]: { readonly code: string; readonly name: string }
  }
  readonly SKILL: readonly Skill[]
  readonly STATE: readonly State[]
  readonly STRAT: readonly Strat[]
  readonly STRAT_CATEGORY: readonly StratCategory[]
  readonly STRAT_RANGE: readonly StratRange[]
  readonly STRAT_TIME: readonly StratTime[]
  readonly TACTICS: readonly any[] // eslint-disable-line @typescript-eslint/no-explicit-any
  readonly UNIT_TYPE: readonly UnitType[]
  readonly VER_TYPE: readonly VerType[]
  readonly VOICE_ACTOR: readonly VoiceActor[]
}
