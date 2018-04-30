const iframeBody = require('./iframe-body')

const removeChildAll = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}

module.exports = class ListFrame {
  constructor (document) {
    const iframe = document.createElement('iframe')
    iframe.style.position = 'absolute'
    iframe.style.top = '10%'
    iframe.style.right = '10%'
    iframe.style.width = '80%'
    iframe.style.height = '80%'
    iframe.style.backgroundColor = 'white'
    iframe.style.zIndex = 100
    document.body.appendChild(iframe)

    this.iframe = iframe
    this.results = []
    this._document = this.iframe.contentWindow.document
    this._document.body.innerHTML = iframeBody
    this._setupEvents()
  }

  _setupEvents () {
    const close = this._document.getElementById('close')
    close.addEventListener('click', () => {
      this.hide()
    })
    const copy = this._document.getElementById('copy')
    copy.addEventListener('click', () => {
      this._copy()
    })
  }

  show () {
    this.iframe.style.display = 'block'
  }

  hide () {
    this.iframe.style.display = 'none'
  }

  _copy () {
    const tempElm = this._document.createElement('div')
    this.results.filter(v => v.selected).forEach((result) => {
      const div = this._document.createElement('div')
      div.innerHTML = this._createCardInfoHtml(result)
      tempElm.appendChild(div)
    })
    const createdBy = this._document.createElement('div')
    createdBy.innerHTML = `<br /><br />この投稿は <a href="">三国志大戦 解任ブックマークレット</a> により作成しています。`
    tempElm.appendChild(createdBy)
    this._document.body.appendChild(tempElm)

    this._document.getSelection().selectAllChildren(tempElm)
    this._document.execCommand('copy')

    this._document.body.removeChild(tempElm)
  }

  update (cardIndexes, searcher) {
    this.results = []
    cardIndexes.forEach(index => {
      const { card, general } = searcher.searchByCardIndex(index)
      if (!card || !general) {
        return
      }
      this.results.push({
        selected: true,
        card,
        general
      })
    })
    this._updateSelectList()
  }

  _updateSelectList () {
    const selectList = this._document.getElementById('main')
    removeChildAll(selectList)
    this.results.forEach((result) => {
      const div = this._document.createElement('div')
      const checkBox = this._document.createElement('input')
      checkBox.setAttribute('type', 'checkbox')
      checkBox.checked = result.selected
      checkBox.addEventListener('click', () => {
        result.selected = checkBox.checked
      })
      const span = this._document.createElement('span')
      span.innerHTML = this._createCardInfoHtml(result)
      div.appendChild(checkBox)
      div.appendChild(span)
      selectList.appendChild(div)
    })
  }

  _createCardInfoHtml ({ card, general }) {
    const genSubsText = card.genSubs.map(v => v[0]).join('')
    return `${card.number}
      <a href="${general.url}" target="_blank">第${general.version}弾 ${general.rarity}${general.name}</a>
      ${card.genMain} ${genSubsText}`
  }
}
