import type {
  BaseData,
  General,
  Card,
  CardInfo,
  LabeledCard,
  LabeledGeneral,
} from 'local-type';

export default class CardSearcher {
  constructor(public baseData: BaseData, public cardData: readonly Card[]) {}

  searchByCardIndex(index: string | null): CardInfo {
    let card: Card | null;
    let general: General | null;
    if (index != null) {
      card = this.cardData[parseInt(index)];
    } else {
      card = null;
    }
    if (card) {
      general = this.baseData.GENERAL[parseInt(card.idx)];
    } else {
      general = null;
    }

    return {
      card: this.createLabeledCard(card),
      general: this.createLabeledGeneral(general),
    };
  }

  private createLabeledCard(card: Card | null): LabeledCard | null {
    if (!card) {
      return null;
    }
    const genMain = this.baseData.GEN_MAIN.filter(
      ({ key }) => key === card.gen_main
    ).map((g) => g)[0];

    const genSubIndexes = [card.gen_sub0, card.gen_sub1, card.gen_sub2]
      .filter((v) => v !== '')
      .map((v) => parseInt(v));
    // genSubIndexes.sort()
    const genSubs = genSubIndexes.map((v) => this.baseData.GEN_SUB[v]);
    const hireLimitDate = card.hire_limit_date;
    const fireDate = card.fire_date;
    const pocket = card.pocket === '1';
    return {
      number: card.number,
      genMain,
      genSubs,
      fireDate,
      hireLimitDate,
      pocket,
    };
  }

  private createLabeledGeneral(general: General | null): LabeledGeneral | null {
    if (!general) {
      return null;
    }
    const personal = this.baseData.PERSONAL[parseInt(general.personal)];
    const state = this.baseData.STATE[parseInt(general.state)];
    const major = general.major_version;
    const verType = this.baseData.VER_TYPE[parseInt(general.ver_type)];
    const minor = verType.name === 'Ex' ? 'EX' : general.add_version;
    const version = minor === '0' ? `第${major}弾` : `第${major}弾-${minor}`;
    const url = `https://3594t.net/datalist/?v=GENERAL&amp;s=POPUP_GENERAL&amp;c=${general.code}`;
    const thumbArcadeUrl = general.avatar
      ? `https://3594t.net/img/avatar/${general.avatar}.png`
      : undefined;
    const thumbPocketUrl = general.pocket_avatar
      ? `https://3594t.net/img/avatar/${general.pocket_avatar}.png`
      : undefined;

    return {
      name: personal.name,
      rarity: general.rarity,
      state,
      version,
      url,
      major,
      minor,
      thumbArcadeUrl,
      thumbPocketUrl,
    };
  }
}
