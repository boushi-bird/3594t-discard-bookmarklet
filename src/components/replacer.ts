interface Replacer {
  p: (key: string, value: string) => Replacer;
  b: () => string;
}

function r(key: string): RegExp {
  return new RegExp(`\\$\\{${key}\\}`, 'g');
}

export default function (template: string): Replacer {
  const rep: Replacer = {
    p: (key: string, value: string) => {
      template = template.replace(r(key), value);
      return rep;
    },
    b: () => template,
  };
  return rep;
}
