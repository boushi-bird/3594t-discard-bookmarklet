import type { LabeledCard, LabeledGeneral } from 'local-type';
import iframeStyle from './templates/iframe-style.html';
import iframeBody from './templates/iframe-body.html';
import CardSearcher from './card-searcher';
import ListRow from './components/list-row';
import CopyArea from './components/copy-area';
import { createColoredState, createColoredGenSub } from './utils';

const removeChildAll = (element: HTMLElement): void => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

type Result = {
  selected: boolean;
  card: LabeledCard;
  general: LabeledGeneral;
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
    selectVertypes.forEach((select) => {
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
    selects.forEach((select) => {
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
    this.results.forEach((result) => {
      result.selected = select;
    });
    this.updateSelectList();
  }

  private copy(): void {
    const selectedResults = this.getVisibleResults().filter((v) => v.selected);
    if (selectedResults.length === 0) {
      window.alert('1つ以上選択する必要があります');
      return;
    }
    const tempElm = this._document.createElement('div');
    this._document.body.appendChild(tempElm);
    tempElm.innerHTML = CopyArea({
      cards: selectedResults,
    });

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

  update(cardIndexes: (string | null)[], searcher: CardSearcher): void {
    this.results = [];
    this.versionFilters = {};
    this.filterCondition.versions = [];
    cardIndexes.forEach((index) => {
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
        return versions.some((version) => {
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
          (v) => v !== version
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
    this.getVisibleResults().forEach((result) => {
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
      span.innerHTML = this.createListRow(result);
      div.appendChild(checkBox);
      div.appendChild(span);
      selectList.appendChild(div);
    });
  }

  private createListRow({ card, general }: Result): string {
    return ListRow({
      num: card.number,
      pocket: card.pocket,
      state: createColoredState(general.state),
      link: general.url,
      version: general.version,
      rarity: general.rarity,
      name: general.name,
      genMain: card.genMain.name_short,
      genSubs: card.genSubs.map(createColoredGenSub),
      hireLimit: card.hireLimitDate,
    });
  }
}
