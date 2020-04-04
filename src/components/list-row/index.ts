import { DateParts } from 'local-type';
import html from './_.html';
import replacer from '../replacer';
import { dateFormat } from '../../utils';

interface Props {
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
}

const hireLimitFormat = ({ MM, dd, hh, mm }: DateParts): string =>
  `${MM}/${dd} ${hh}:${mm}`;

export default function (props: Props): string {
  return replacer(html)
    .p('CARD_NUMBER', props.num)
    .p('POCKET', props.pocket ? '(ぽ)' : '')
    .p('STATE', props.state)
    .p('LINK', props.link)
    .p('VERSION', props.version)
    .p('RARITY', props.rarity)
    .p('NAME', props.name)
    .p('GEN_MAIN', props.genMain)
    .p('GEN_SUBS', props.genSubs.join(''))
    .p('HIRE_LIMIT', dateFormat(props.hireLimit, hireLimitFormat))
    .b();
}
