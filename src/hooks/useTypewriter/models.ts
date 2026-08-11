// 初期ロード時に表示する文字
export const INITIAL_WORDS = 'welcome!';

// ルートページに表示する文字
export const TITLE_WORDS = [
  'synmm....',
  // 'synchronicity',
  // 'synthesis',
  // 'sympathy',
  // 'symphony',
  // 'symbiosis',
  // 'synanthrope',
  // 'symmetry',
  // 'synergy',
  // 'synaesthesia',w
];

// キーボード配列に基づく誤入力候補 (QWERTY近傍キー)
export const SEPARATED_QWERTY_NEAR_KEYS: Record<string, string[]> = {
  a: ['s', 'q'],
  b: ['v', 'g'],
  c: ['x', 'd', 'v'],
  d: ['s', 'e', 'f', 'c'],
  e: ['w', 'd', 'r'],
  f: ['d', 'r', 'g', 'v'],
  g: ['f', 't', 'b'],
  h: ['y', 'j', 'n'],
  i: ['u', 'k', 'o'],
  j: ['h', 'u', 'k', 'm'],
  k: ['j', 'i', 'l', ','],
  l: ['k', 'o', ';', '.'],
  m: ['n', 'j', ','],
  n: ['h', 'm'],
  o: ['i', 'l', 'p'],
  p: ['o', '-', ';'],
  q: ['w', 'a'],
  r: ['e', 'g', 'f', 't'],
  s: ['a', 'w', 'd', 'x'],
  t: ['r', 'g'],
  u: ['y', 'j', 'i'],
  v: ['c', 'f', 'b'],
  w: ['q', 's', 'e'],
  x: ['z', 's', 'c'],
  y: ['h', 'u'],
  z: ['a', 's'],
  '.': [',', '/'],
};
