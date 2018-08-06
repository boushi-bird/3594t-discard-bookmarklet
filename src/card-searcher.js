module.exports = class CardSearcher {
  constructor (baseData, cardData) {
    this.baseData = baseData
    this.cardData = cardData
  }

  searchByCardIndex (index) {
    let card, general
    if (index != null) {
      card = this.cardData[parseInt(index)]
    } else {
      card = null
    }
    if (card) {
      general = this.baseData['GENERAL'][parseInt(card.idx)]
    } else {
      general = null
    }

    return {
      card: this._createLabeledCard(card),
      general: this._createLabeledGeneral(general)
    }
  }

  _createLabeledCard (card) {
    if (!card) {
      return null
    }
    const genMain = this.baseData['GEN_MAIN']
      .filter(({key}) => key === card['gen_main'])
      .map(g => g['name_short'])[0]

    const genSubIndexes = [card['gen_sub0'], card['gen_sub1'], card['gen_sub2']]
      .filter(v => v !== '')
      .map(v => parseInt(v))
    // genSubIndexes.sort()
    const genSubs = genSubIndexes
      .map(v => this.baseData['GEN_SUB'][v]['name_short'])
    const fireDate = this._dateFormat(card['fire_date'])
    return {
      number: card.number,
      genMain,
      genSubs,
      fireDate
    }
  }

  _dateFormat (stringDate) {
    if (!stringDate || stringDate.length !== 14) {
      return ''
    }
    // yyyyMMddhhmmss -> MM/dd hh:mm
    const MM = stringDate.substr(4, 2)
    const dd = stringDate.substr(6, 2)
    const hh = stringDate.substr(8, 2)
    const mm = stringDate.substr(10, 2)
    return `${MM}/${dd} ${hh}:${mm}`
  }

  _createLabeledGeneral (general) {
    if (!general) {
      return null
    }
    const personal = this.baseData['PERSONAL'][parseInt(general.personal)]
    const major = general['major_version']
    const verType = this.baseData['VER_TYPE'][parseInt(general['ver_type'])]
    const minor = verType.name === 'Ex' ? 'EX' : general['add_version']
    const version = minor === '0' ? `第${major}弾` : `第${major}弾-${minor}`
    const url = `https://3594t.net/datalist/?v=GENERAL&amp;s=POPUP_GENERAL&amp;c=${general.code}`

    return {
      name: personal.name,
      rarity: general.rarity,
      version,
      url,
      major,
      minor
    }
  }
}
