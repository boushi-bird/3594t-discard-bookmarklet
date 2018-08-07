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
<br />`
    tempElm.appendChild(description)
    const hireLimitFormat = ({yyyy, MM, dd, hh, mm}) => `${yyyy}/${MM}/${dd} ${hh}:${mm}`
    this._partitionHideLimitGroup(selectedResults).forEach(({ min, max, list }) => {
      const hireLimit = this._document.createElement('div')
      if (max !== min) {
        hireLimit.innerHTML = `<br /><br />
登用期限: ${this._dateFormat(min, hireLimitFormat)} - ${this._dateFormat(max, hireLimitFormat)}`
      } else {
        hireLimit.innerHTML = `<br /><br />
登用期限: ${this._dateFormat(min, hireLimitFormat)}`
      }
      tempElm.appendChild(hireLimit)
      list.forEach((result) => {
        const div = this._document.createElement('div')
        div.innerHTML = this._createCardInfoHtml(result, false)
        tempElm.appendChild(div)
      })
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

  _partitionHideLimitGroup (selectedResults) {
    let current = null
    const results = []
    const compare = (v1, v2) => {
      return parseInt(v1) - parseInt(v2)
    }
    const needNext = (hireLimitDate) => {
      if (current == null) {
        return true
      }
      // 20枚以上
      if (current.list.length >= 20) {
        return true
      }
      // 5枚以上かつ日付が変わったら
      if (current.list.length >= 5 && compare(current.min, hireLimitDate) !== 0) {
        return true
      }
      // 3日以上空いている
      if (compare(current.max, hireLimitDate) >= 3000000) {
        return true
      }
      return false
    }
    const nextPartition = (hireLimitDate) => {
      if (!needNext(hireLimitDate)) {
        return
      }
      current = { min: null, max: null, list: [] }
      results.push(current)
    }
    selectedResults.forEach(r => {
      const { card: { hireLimitDate } } = r
      nextPartition(hireLimitDate)
      if (current.min == null || compare(current.min, hireLimitDate) > 0) {
        current.min = hireLimitDate
      }
      if (current.max == null || compare(current.max, hireLimitDate) < 0) {
        current.max = hireLimitDate
      }
      current.list.push(r)
    })
    return results
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
      const verLavel = `第${general.major}段`
      if (!this.versionFilters[verLavel]) {
        const { major } = general
        this.versionFilters[verLavel] = major
        this.filterCondition.versions.push(verLavel)
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
      .filter(({ general: { major } }) => {
        const { versions } = this.filterCondition
        return versions.some((version) => {
          const verCondition = this.versionFilters[version]
          return major === verCondition
        })
      })
  }

  _updateFilters () {
    const filter = this._document.getElementById('filter')
    removeChildAll(filter)
    const versions = Object.keys(this.versionFilters)
    versions.sort((v1, v2) => {
      return parseInt(this.versionFilters[v1]) - parseInt(this.versionFilters[v2])
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

  _createCardInfoHtml ({ card, general }, showHireLimit = true) {
    const genSubsText = card.genSubs.map(v => v[0]).join('')
    let displayHireLimitDate = ''
    if (showHireLimit) {
      displayHireLimitDate = ' | 期限:' + this._dateFormat(card.hireLimitDate, ({MM, dd, hh, mm}) => `${MM}/${dd} ${hh}:${mm}`)
    }
    return `${card.number}
      ${general.stateName} <a href="${general.url}" target="_blank">${general.version} ${general.rarity}${general.name}</a>
      ${card.genMain} ${genSubsText}${displayHireLimitDate}`
  }

  _dateFormat (stringDate, formatFunc) {
    if (!stringDate || stringDate.length !== 14) {
      return ''
    }
    return formatFunc({
      yyyy: stringDate.substr(0, 4),
      MM: stringDate.substr(4, 2),
      dd: stringDate.substr(6, 2),
      hh: stringDate.substr(8, 2),
      mm: stringDate.substr(10, 2),
      ss: stringDate.substr(12, 2)
    })
  }
}
