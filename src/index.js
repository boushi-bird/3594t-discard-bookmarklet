const CardSearcher = require('./card-searcher')
const ListFrame = require('./list-frame')

const scriptId = 'VsD8NEfx'

const listFrame = new ListFrame(document)

const run = () => {
  if (!global.member_card_fire_date ||
    !global.member_data || !global.member_data['CARD'] ||
    !global.base_data) {
    global.alert(`[三国志大戦 解任ブックマークレット]
データを読み込み中またはデータリストのページではありません。`)
    listFrame.hide()
    return
  }
  listFrame.show()

  const searcher = new CardSearcher(
    global.base_data,
    global.member_data['CARD'])
  const fireDate = window.member_card_fire_date
  const fireIndexes = fireDate.map(v => v.index)
  listFrame.update(fireIndexes, searcher)
}

global[scriptId] = run

run()
