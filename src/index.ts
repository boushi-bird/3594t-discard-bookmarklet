import CardSearcher from './card-searcher'
import ListFrame from './list-frame'

const scriptId = configDefines.scriptId

const listFrame = new ListFrame(document)

const run = (): void => {
  /* eslint-disable @typescript-eslint/camelcase */
  if (
    !window.member_card_fire_date ||
    !window.member_data ||
    !window.member_data.CARD ||
    !window.base_data
  ) {
    /* eslint-enable @typescript-eslint/camelcase */
    window.alert(`[三国志大戦 解任ブックマークレット]
データを読み込み中またはデータリストのページではありません。`)
    listFrame.hide()
    return
  }
  listFrame.show()

  const searcher = new CardSearcher(window.base_data, window.member_data.CARD)
  const fireDate = window.member_card_fire_date
  const fireIndexes = fireDate.map(v => v.index)
  listFrame.update(fireIndexes, searcher)
}
;(window as any)[scriptId] = run // eslint-disable-line @typescript-eslint/no-explicit-any

run()
