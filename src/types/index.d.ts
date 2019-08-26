import { BaseData } from '../baseData'
import { MemberData } from '../memberData'

declare global {
  let configDefines: { [key: string]: string }

  interface Window {
    base_data: BaseData
    member_data: MemberData
    member_card_fire_date: { date: string; index: string }[]
  }
}
