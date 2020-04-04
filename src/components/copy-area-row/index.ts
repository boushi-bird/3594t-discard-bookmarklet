import { DateParts } from 'local-type';
import html from './_.html';
import replacer from '../replacer';
import { dateFormat } from '../../utils';

interface Props {
  thumbUrl?: string;
  num: string;
  pocket: boolean;
  state: string;
  link: string;
  version: string;
  rarity: string;
  name: string;
  genMain: string;
  genSubs: string[];
  hireLimit: string;
  searchTexts: string[];
}

const hireLimitFormat: (parts: DateParts) => string = ({
  yyyy,
  MM,
  dd,
  hh,
  mm,
}) => `${yyyy}/${MM}/${dd} ${hh}:${mm}`;

export default function (props: Props): string {
  const thumb = props.thumbUrl
    ? `<img src="${props.thumbUrl}" width="48" height="48" />`
    : '';
  const cardType = props.pocket
    ? '<img src="https://3594t.net/img/datalist/icon_pocket.png" alt="ぽけっと">'
    : '<img src="https://3594t.net/img/datalist/icon_arcade.png" alt="アーケード">';
  return replacer(html)
    .p('CARD_IMAGE', thumb)
    .p('CARD_NUMBER', props.num)
    .p('CARD_TYPE', cardType)
    .p('STATE', props.state)
    .p('LINK', props.link)
    .p('VERSION', props.version)
    .p('RARITY', props.rarity)
    .p('NAME', props.name)
    .p('GEN_MAIN', props.genMain)
    .p('GEN_SUBS', props.genSubs.join(''))
    .p('HIRE_LIMIT', dateFormat(props.hireLimit, hireLimitFormat))
    .p('SEARCH_TEXTS', props.searchTexts.join(' '))
    .b();
}
