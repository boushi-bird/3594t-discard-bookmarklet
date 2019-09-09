import iframeStyle from './templates/iframe-style.html';
import iframeBody from './templates/iframe-body.html';
import copyPlainText from './templates/copy-plain-text.html';
import CardSearcher, { LabeledCard, LabeledGeneral } from './card-searcher';
import { State, GenSub } from './data-types';

const removeChildAll = (element: HTMLElement): void => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

type DateParts = {
  yyyy: string;
  MM: string;
  dd: string;
  hh: string;
  mm: string;
  ss: string;
};
type Result = {
  selected: boolean;
  card: LabeledCard;
  general: LabeledGeneral;
};
type ResultGroup = {
  min: string | null;
  max: string | null;
  list: Result[];
};

// polyfill
Number.isNaN =
  Number.isNaN ||
  function(value): boolean {
    // eslint-disable-next-line no-self-compare
    return typeof value === 'number' && value !== value;
  };

export default class ListFrame {
  private iframe: HTMLIFrameElement;
  private results: Result[];
  private versionFilters: { [verLabel: string]: string };
  private filterCondition: {
    verTypes: { normal: boolean; pocket: boolean };
    rarities: { sr: boolean; r: boolean; other: boolean };
    versions: string[];
  };

  private _document: Document;

  constructor(document: Document) {
    const iframe = document.createElement('iframe');
    const hRatio = 0.9;
    iframe.style.position = 'fixed';
    iframe.style.top = '5px';
    iframe.style.left = '5px';
    iframe.style.width = '90%';
    iframe.style.minWidth = '480px';
    iframe.style.maxWidth = '720px';
    iframe.style.minHeight = `${hRatio * 100}%`;
    iframe.style.height = `${window.innerHeight * hRatio}px`;
    iframe.style.backgroundColor = 'white';
    iframe.style.zIndex = '1000';
    // window.addEventListener('resize', () => {
    //   iframe.style.height = `${window.innerHeight * hRatio}px`
    // })
    document.body.appendChild(iframe);

    this.iframe = iframe;
    this.results = [];
    this.versionFilters = {};
    this.filterCondition = {
      verTypes: {
        normal: true,
        pocket: true,
      },
      rarities: {
        sr: true,
        r: true,
        other: true,
      },
      versions: [],
    };
    const w = this.iframe.contentWindow;
    if (w) {
      this._document = w.document;
      this._document.body.innerHTML = iframeBody;
      const domParser = new DOMParser();
      const style = domParser.parseFromString(iframeStyle, 'text/html');
      if (style.firstChild) {
        this._document.head.appendChild(style.firstChild);
      }
      this.setupEvents();
    }
  }

  private setupEvents(): void {
    const close = this._document.getElementById('close');
    close &&
      close.addEventListener('click', () => {
        this.hide();
      });
    const copy = this._document.getElementById('copy');
    copy &&
      copy.addEventListener('click', () => {
        this.copy();
      });
    const selectAll = this._document.getElementById('select_all');
    selectAll &&
      selectAll.addEventListener('click', () => {
        this.selectionChangeAll(true);
      });
    const clearAll = this._document.getElementById('clear_all');
    clearAll &&
      clearAll.addEventListener('click', () => {
        this.selectionChangeAll(false);
      });
    const selectNormal = this._document.getElementById(
      'select_normal'
    ) as HTMLInputElement | null;
    const selectPocket = this._document.getElementById(
      'select_pocket'
    ) as HTMLInputElement | null;
    const selectVertypes = [selectNormal, selectPocket];
    selectVertypes.forEach(select => {
      select &&
        select.addEventListener('click', () => {
          this.filterCondition.verTypes = {
            normal: !!selectNormal && selectNormal.checked,
            pocket: !!selectPocket && selectPocket.checked,
          };
          this.updateSelectList();
        });
    });
    const selectSR = this._document.getElementById(
      'select_sr'
    ) as HTMLInputElement | null;
    const selectR = this._document.getElementById(
      'select_r'
    ) as HTMLInputElement | null;
    const selectOther = this._document.getElementById(
      'select_other'
    ) as HTMLInputElement | null;
    const selects = [selectSR, selectR, selectOther];
    selects.forEach(select => {
      select &&
        select.addEventListener('click', () => {
          this.filterCondition.rarities = {
            sr: !!selectSR && selectSR.checked,
            r: !!selectR && selectR.checked,
            other: !!selectOther && selectOther.checked,
          };
          this.updateSelectList();
        });
    });
    const filter = this._document.getElementById('filter');
    const showFilter = this._document.getElementById('show_filter');
    showFilter &&
      showFilter.addEventListener('click', () => {
        filter && (filter.style.display = 'inline');
        showFilter.style.display = 'none';
      });
  }

  show(): void {
    this.iframe.style.display = 'block';
  }

  hide(): void {
    this.iframe.style.display = 'none';
  }

  private selectionChangeAll(select: boolean): void {
    this.results.forEach(result => {
      result.selected = select;
    });
    this.updateSelectList();
  }

  private copy(): void {
    const selectedResults = this.getVisibleResults().filter(v => v.selected);
    if (selectedResults.length === 0) {
      window.alert('1つ以上選択する必要があります');
      return;
    }
    const hasPocket = selectedResults.some(g => g.card.pocket);
    const tempElm = this._document.createElement('div');
    this._document.body.appendChild(tempElm);
    const description = this._document.createElement('div');
    let descriptionHtml = `武将名のリンクから登用ページへ行けます
<br />`;
    if (hasPocket) {
      descriptionHtml += `(ぽ)・・・ぽけっと武将
<br />`;
    }
    description.innerHTML = descriptionHtml;
    tempElm.appendChild(description);
    const hireLimitFormat: (parts: DateParts) => string = ({
      yyyy,
      MM,
      dd,
      hh,
      mm,
    }) => `${yyyy}/${MM}/${dd} ${hh}:${mm}`;
    this.partitionHideLimitGroup(selectedResults).forEach(
      ({ min, max, list }) => {
        const hireLimit = this._document.createElement('div');
        if (max !== min) {
          hireLimit.innerHTML = `<br /><br />
登用期限: ${this.dateFormat(min, hireLimitFormat)} - ${this.dateFormat(
            max,
            hireLimitFormat
          )}`;
        } else {
          hireLimit.innerHTML = `<br /><br />
登用期限: ${this.dateFormat(min, hireLimitFormat)}`;
        }
        tempElm.appendChild(hireLimit);
        list.forEach(result => {
          const div = this._document.createElement('div');
          div.innerHTML = this.createCopyCardInfoHtml(result);
          tempElm.appendChild(div);
        });
      }
    );
    const createdBy = this._document.createElement('div');
    createdBy.innerHTML = `<br /><br />
この投稿は 三国志大戦 解任ブックマークレット(<a href="https://boushi-bird.github.io/3594t-discard-bookmarklet/">https://boushi-bird.github.io/3594t-discard-bookmarklet/</a>)
により作成しています。`;
    tempElm.appendChild(createdBy);
    this._document.body.appendChild(tempElm);

    const selection = this._document.getSelection();
    selection && selection.selectAllChildren(tempElm);
    const success = this._document.execCommand('copy');

    this._document.body.removeChild(tempElm);
    if (success) {
      const message = this._document.getElementById('message');
      message && (message.innerHTML = '<small>コピーしました!</small>');
      setTimeout(() => {
        message && (message.innerHTML = '');
      }, 2000);
    }
  }

  private partitionHideLimitGroup(selectedResults: Result[]): ResultGroup[] {
    let current: ResultGroup | null = null;
    const results: ResultGroup[] = [];
    const compare = (v1: string, v2: string): number => {
      return parseInt(v1) - parseInt(v2);
    };
    const needNext = (hireLimitDate: string): boolean => {
      if (current == null || current.min == null) {
        return true;
      }
      // 日付が変わったら
      if (compare(current.min, hireLimitDate) !== 0) {
        return true;
      }
      return false;
    };
    const nextPartition = (hireLimitDate: string): void => {
      if (!needNext(hireLimitDate)) {
        return;
      }
      current = { min: null, max: null, list: [] };
      results.push(current);
    };
    selectedResults.forEach(r => {
      const {
        card: { hireLimitDate },
      } = r;
      nextPartition(hireLimitDate);
      if (current == null) {
        return;
      }
      if (current.min == null || compare(current.min, hireLimitDate) > 0) {
        current.min = hireLimitDate;
      }
      if (current.max == null || compare(current.max, hireLimitDate) < 0) {
        current.max = hireLimitDate;
      }
      current.list.push(r);
    });
    return results;
  }

  update(cardIndexes: (string | null)[], searcher: CardSearcher): void {
    this.results = [];
    this.versionFilters = {};
    this.filterCondition.versions = [];
    cardIndexes.forEach(index => {
      const { card, general } = searcher.searchByCardIndex(index);
      if (!card || !general) {
        return;
      }
      this.results.push({
        selected: true,
        card,
        general,
      });
      const verLabel = `第${general.major}段`;
      if (!this.versionFilters[verLabel]) {
        const { major } = general;
        this.versionFilters[verLabel] = major;
        this.filterCondition.versions.push(verLabel);
      }
    });
    this.updateFilters();
    this.updateSelectList();
  }

  private getVisibleResults(): Result[] {
    return this.results
      .filter(({ card: { pocket: hasPocket } }) => {
        const {
          verTypes: { normal, pocket },
        } = this.filterCondition;
        if (hasPocket) {
          return pocket;
        } else {
          return normal;
        }
      })
      .filter(({ general: { rarity } }) => {
        const {
          rarities: { sr, r, other },
        } = this.filterCondition;
        if (rarity === 'SR') {
          return sr;
        } else if (rarity === 'R') {
          return r;
        }
        return other;
      })
      .filter(({ general: { major } }) => {
        const { versions } = this.filterCondition;
        return versions.some(version => {
          const verCondition = this.versionFilters[version];
          return major === verCondition;
        });
      });
  }

  private updateFilters(): void {
    const filterVersions = this._document.getElementById('filter-versions');
    if (!filterVersions) {
      return;
    }
    removeChildAll(filterVersions);
    const versions = Object.keys(this.versionFilters);
    versions.sort((v1, v2) => {
      return (
        parseInt(this.versionFilters[v1]) - parseInt(this.versionFilters[v2])
      );
    });
    versions.forEach((version, i) => {
      const id = `filter_v${i}`;
      const checkBox = this._document.createElement('input');
      checkBox.setAttribute('id', id);
      checkBox.setAttribute('type', 'checkbox');
      checkBox.setAttribute('class', 'large-checkbox');
      checkBox.checked = this.filterCondition.versions.indexOf(version) >= 0;
      checkBox.addEventListener('click', () => {
        const newVersions = this.filterCondition.versions.filter(
          v => v !== version
        );
        if (checkBox.checked) {
          newVersions.push(version);
        }
        this.filterCondition.versions = newVersions;
        this.updateSelectList();
      });
      const label = this._document.createElement('label');
      label.setAttribute('for', id);
      label.setAttribute('style', 'margin-right:10px;');
      label.innerHTML = version;
      filterVersions.appendChild(checkBox);
      filterVersions.appendChild(label);
    });
    const filter = this._document.getElementById('filter');
    const showFilter = this._document.getElementById('show_filter');
    if (showFilter) {
      if (versions.length > 0) {
        showFilter.style.display = 'inline';
      } else {
        showFilter.style.display = 'none';
      }
    }
    filter && (filter.style.display = 'none');
  }

  private updateSelectList(): void {
    const selectList = this._document.getElementById('main');
    if (!selectList) {
      return;
    }
    removeChildAll(selectList);
    this.getVisibleResults().forEach(result => {
      const div = this._document.createElement('div');
      const checkBox = this._document.createElement('input');
      checkBox.setAttribute('type', 'checkbox');
      checkBox.setAttribute('class', 'list-checkbox large-checkbox');
      checkBox.checked = result.selected;
      checkBox.addEventListener('click', () => {
        result.selected = checkBox.checked;
      });
      const span = this._document.createElement('span');
      span.style.verticalAlign = 'super';
      span.innerHTML = this.createCardInfoHtml(result);
      div.appendChild(checkBox);
      div.appendChild(span);
      selectList.appendChild(div);
    });
  }

  private createCardInfoHtml(result: Result): string {
    const displayHireLimitDate =
      ' | 期限:' +
      this.dateFormat(
        result.card.hireLimitDate,
        ({ MM, dd, hh, mm }) => `${MM}/${dd} ${hh}:${mm}`
      );
    return `${this.createCopyCardInfoHtml(result)}${displayHireLimitDate}`;
  }

  private createCopyCardInfoHtml({ card, general }: Result): string {
    const genSubsText = card.genSubs.map(this.createColoredGenSub).join('');
    const p = this.p;
    return copyPlainText
      .replace(p('CARD_NUMBER'), card.number)
      .replace(p('POCKET'), card.pocket ? '(ぽ)' : '')
      .replace(p('STATE'), this.createColoredState(general.state))
      .replace(p('LINK'), general.url)
      .replace(p('VERSION'), general.version)
      .replace(p('RARITY'), general.rarity)
      .replace(p('NAME'), general.name)
      .replace(p('GEN_MAIN'), card.genMain.name_short)
      .replace(p('GEN_SUBS'), `${genSubsText}`);
  }

  private createColoredState(state: State): string {
    const { red, green, blue } = state;
    const padStartHex = (s: string): string => {
      return ('00' + (parseInt(s) || 0).toString(16)).substr(-2);
    };
    const color =
      '#' + padStartHex(red) + padStartHex(green) + padStartHex(blue);
    return `<font color="${color}">${state.name_short}</font>`;
  }

  private createColoredGenSub(genSub: GenSub): string {
    const nameShort = genSub.name_short;
    let s;
    if (nameShort === '復活') {
      s = '活';
    } else {
      s = nameShort[0];
    }
    let color = 'black';
    switch (s) {
      case '兵':
        color = 'green';
        break;
      case '速':
        color = 'blue';
        break;
      case '攻':
        color = 'red';
        break;
      case '活':
        color = '#ffd12a';
        break;
    }
    return `<font color="${color}">${s}</font>`;
  }

  private p(key: string): RegExp {
    return new RegExp(`\\$\\{${key}\\}`, 'g');
  }

  private dateFormat(
    stringDate: string | null,
    formatFunc: (parts: DateParts) => string
  ): string {
    if (!stringDate || stringDate.length !== 14) {
      return '';
    }
    return formatFunc({
      yyyy: stringDate.substr(0, 4),
      MM: stringDate.substr(4, 2),
      dd: stringDate.substr(6, 2),
      hh: stringDate.substr(8, 2),
      mm: stringDate.substr(10, 2),
      ss: stringDate.substr(12, 2),
    });
  }
}
