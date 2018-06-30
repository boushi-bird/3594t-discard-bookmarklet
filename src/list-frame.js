const iframeBody = require('./iframe-body')

const removeChildAll = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}

// polyfill
Number.isNaN = Number.isNaN || function (value) {
  // eslint-disable-next-line no-self-compare
  return typeof value === 'number' && value !== value
}

module.exports = class ListFrame {
  constructor (document) {
    const iframe = document.createElement('iframe')
    iframe.style.position = 'absolute'
    iframe.style.top = '0px'
    iframe.style.left = '0px'
    iframe.style.width = '90vw'
    iframe.style.minWidth = '480px'
    iframe.style.maxWidth = '720px'
    iframe.style.height = '98vh'
    iframe.style.backgroundColor = 'white'
    iframe.style.zIndex = 1000
    document.body.appendChild(iframe)

    this.iframe = iframe
    this.results = []
    this.versionFilters = {}
    this.filterCondition = {
      rarities: {
        sr: true,
        r: true,
        other: true
      },
      versions: []
    }
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
    const selectSR = this._document.getElementById('select_sr')
    const selectR = this._document.getElementById('select_r')
    const selectOther = this._document.getElementById('select_other')
    const selects = [selectSR, selectR, selectOther]
    selects.forEach((select) => {
      select.addEventListener('click', () => {
        this.filterCondition.rarities = {
          sr: selectSR.checked,
          r: selectR.checked,
          other: selectOther.checked
        }
        this._updateSelectList()
      })
    })
    const filter = this._document.getElementById('filter')
    const showFilter = this._document.getElementById('show_filter')
    showFilter.addEventListener('click', () => {
      filter.style.display = 'inline'
      showFilter.style.display = 'none'
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
    const selectedResults = this._getVisibleResults().filter(v => v.selected)
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
    this.versionFilters = {}
    this.filterCondition.versions = []
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
      if (!this.versionFilters[general.version]) {
        const { major, minor } = general
        this.versionFilters[general.version] = { major, minor }
        this.filterCondition.versions.push(general.version)
      }
    })
    this._updateFilters()
    this._updateSelectList()
  }

  _getVisibleResults () {
    return this.results
      .filter(({ general: { rarity } }) => {
        const { rarities: { sr, r, other } } = this.filterCondition
        if (rarity === 'SR') {
          return sr
        } else if (rarity === 'R') {
          return r
        }
        return other
      })
      .filter(({ general: { major, minor } }) => {
        const { versions } = this.filterCondition
        return versions.some((version) => {
          const verCondition = this.versionFilters[version]
          return major === verCondition.major && minor === verCondition.minor
        })
      })
  }

  _updateFilters () {
    const filter = this._document.getElementById('filter')
    removeChildAll(filter)
    const versions = Object.keys(this.versionFilters)
    versions.sort((v1, v2) => {
      const volume = (v) => {
        const { major, minor } = v
        let minorVol = parseInt(minor)
        if (Number.isNaN(minorVol)) {
          minorVol = 99
        }
        return parseInt(major) * 100 + minorVol
      }
      return volume(this.versionFilters[v1]) - volume(this.versionFilters[v2])
    })
    versions.forEach((version, i) => {
      const id = `filter_v${i}`
      const checkBox = this._document.createElement('input')
      checkBox.setAttribute('id', id)
      checkBox.setAttribute('type', 'checkbox')
      checkBox.setAttribute('style', '-ms-transform:scale(1.5,1.5);-webkit-transform:scale(1.5,1.5);transform:scale(1.5,1.5);')
      checkBox.checked = this.filterCondition.versions.indexOf(version) >= 0
      checkBox.addEventListener('click', () => {
        const newVersions = this.filterCondition.versions.filter(v => v !== version)
        if (checkBox.checked) {
          newVersions.push(version)
        }
        this.filterCondition.versions = newVersions
        this._updateSelectList()
      })
      const label = this._document.createElement('label')
      label.setAttribute('for', id)
      label.setAttribute('style', 'margin-right:10px;')
      label.innerHTML = version
      filter.appendChild(checkBox)
      filter.appendChild(label)
    })
    const showFilter = this._document.getElementById('show_filter')
    if (versions.length > 0) {
      showFilter.style.display = 'inline'
    } else {
      showFilter.style.display = 'none'
    }
    filter.style.display = 'none'
  }

  _updateSelectList () {
    const selectList = this._document.getElementById('main')
    removeChildAll(selectList)
    this._getVisibleResults().forEach((result) => {
      const div = this._document.createElement('div')
      const checkBox = this._document.createElement('input')
      checkBox.setAttribute('type', 'checkbox')
      checkBox.setAttribute('style', '-ms-transform:scale(1.5,1.5);-webkit-transform:scale(1.5,1.5);transform:scale(1.5,1.5);')
      checkBox.style.width = '24px'
      checkBox.style.height = '24px'
      checkBox.style.margin = '10px'
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
      <a href="${general.url}" target="_blank">${general.version} ${general.rarity}${general.name}</a>
      ${card.genMain} ${genSubsText}`
  }
}
