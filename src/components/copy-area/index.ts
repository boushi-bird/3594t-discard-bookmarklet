import { LabeledCard, LabeledGeneral, GenSub } from 'local-type';
import html from './_.html';
import replacer from '../replacer';
import CopyAreaRow from '../copy-area-row';
import {
  dateFormat,
  createColoredState,
  createGenSubText,
  createColoredGenSub,
} from '../../utils';

interface CardInfoRequire {
  card: LabeledCard;
  general: LabeledGeneral;
}

interface Props {
  cards: CardInfoRequire[];
}

function genSubToNumber(genSubText: string): number {
  switch (genSubText) {
    case '兵':
      return 1;
    case '速':
      return 2;
    case '攻':
      return 3;
    case '活':
      return 4;
    default:
      return 99;
  }
}

function createSearchTextGenSubs(genSubs: GenSub[]): string[] {
  const genSubTexts = genSubs.map(createGenSubText);
  // 数が多い副将器が先、それ以外はgenSubToNumber順
  genSubTexts.sort((a, b) => {
    const numA =
      genSubTexts.filter((s) => s === a).length <= 1 ? genSubToNumber(a) : 0;
    const numB =
      genSubTexts.filter((s) => s === b).length <= 1 ? genSubToNumber(b) : 0;
    return numA - numB;
  });
  return genSubTexts;
}

function createSearchTexts({ card, general }: CardInfoRequire): string[] {
  const generalPart = `${general.version}${general.state.name_short}${general.rarity}${general.name}`;
  const genSubTexts = createSearchTextGenSubs(card.genSubs);
  const cardPart = `${card.genMain.name_short}${genSubTexts.join('')}`;
  return [card.fireDate, card.hireLimitDate]
    .map((d) => dateFormat(d, ({ yyyy, MM }) => `${yyyy}${MM}`))
    .map((datePart) => `${datePart}${generalPart}_${cardPart}`);
}

export default function (props: Props): string {
  const cardListRows = props.cards.map(({ card, general }) => {
    const thumbUrl = card.pocket
      ? general.thumbPocketUrl
      : general.thumbArcadeUrl;
    return CopyAreaRow({
      thumbUrl,
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
      searchTexts: createSearchTexts({ card, general }),
    });
  });
  return replacer(html).p('COPY_AREA_ROWS', cardListRows.join('')).b();
}
