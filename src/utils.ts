import { GenSub, State, DateParts } from 'local-type';

export function dateFormat(
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
function padStartHex(s: string): string {
  return ('00' + (parseInt(s) || 0).toString(16)).substr(-2);
}

export function createColoredState(state: State): string {
  const { red, green, blue } = state;
  const color = '#' + padStartHex(red) + padStartHex(green) + padStartHex(blue);
  return `<font color="${color}">${state.name_short}</font>`;
}

export function createGenSubText(genSub: GenSub): string {
  const nameShort = genSub.name_short;
  if (nameShort === '復活') {
    return '活';
  } else {
    return nameShort[0];
  }
}

export function createColoredGenSub(genSub: GenSub): string {
  const s = createGenSubText(genSub);
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
