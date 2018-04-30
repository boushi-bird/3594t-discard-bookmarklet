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
    iframe.style.top = '10vh'
    iframe.style.right = '10vh'
    iframe.style.width = '80vw'
    iframe.style.height = '80vh'
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
    const selectAll = this._document.getElementById('select_all')
    selectAll.addEventListener('click', () => {
      this._selectionChangeAll(true)
    })
    const clearAll = this._document.getElementById('clear_all')
    clearAll.addEventListener('click', () => {
      this._selectionChangeAll(false)
    })
  }

  show () {
    this.iframe.style.display = 'block'
  }

  hide () {
    this.iframe.style.display = 'none'
  }

  _selectionChangeAll (select) {
    this.results.forEach((result) => {
      result.selected = select
    })
    this._updateSelectList()
  }

  _copy () {
    const selectedResults = this.results.filter(v => v.selected)
    if (selectedResults.length === 0) {
      global.alert('1つ以上選択する必要があります')
      return
    }
    const tempElm = this._document.createElement('div')
    this._document.body.appendChild(tempElm)
    const description = this._document.createElement('div')
    description.innerHTML = `武将名のリンクから登用ページへ行けます
<br /><br />`
    tempElm.appendChild(description)
    selectedResults.forEach((result) => {
      const div = this._document.createElement('div')
      div.innerHTML = this._createCardInfoHtml(result)
      tempElm.appendChild(div)
    })
    const createdBy = this._document.createElement('div')
    createdBy.innerHTML = `<br /><br />
この投稿は 三国志大戦 解任ブックマークレット(<a href="https://boushi-bird.github.io/3594t-discard-bookmarklet/">https://boushi-bird.github.io/3594t-discard-bookmarklet/</a>)
により作成しています。`
    tempElm.appendChild(createdBy)
    this._document.body.appendChild(tempElm)

    this._document.getSelection().selectAllChildren(tempElm)
    const success = this._document.execCommand('copy')

    this._document.body.removeChild(tempElm)
    if (success) {
      const message = this._document.getElementById('message')
      message.innerHTML = '<small>コピーしました!</small>'
      setTimeout(() => {
        message.innerHTML = ''
      }, 2000)
    }
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
      checkBox.setAttribute('style', '-ms-transform:scale(2, 2);-webkit-transform:scale(2, 2);transform:scale(2, 2);')
      checkBox.style.width = '24px'
      checkBox.style.height = '24px'
      checkBox.checked = result.selected
      checkBox.addEventListener('click', () => {
        result.selected = checkBox.checked
      })
      const span = this._document.createElement('span')
      span.style.verticalAlign = 'super'
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
