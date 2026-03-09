import type { Character } from '@/lib/types';

export const katakana: Character[] = [
  // ア행
  { character: 'ア', romaji: 'a', type: 'katakana', row: 'ア행' },
  { character: 'イ', romaji: 'i', type: 'katakana', row: 'ア행' },
  { character: 'ウ', romaji: 'u', type: 'katakana', row: 'ア행' },
  { character: 'エ', romaji: 'e', type: 'katakana', row: 'ア행' },
  { character: 'オ', romaji: 'o', type: 'katakana', row: 'ア행' },
  // カ행
  { character: 'カ', romaji: 'ka', type: 'katakana', row: 'カ행' },
  { character: 'キ', romaji: 'ki', type: 'katakana', row: 'カ행' },
  { character: 'ク', romaji: 'ku', type: 'katakana', row: 'カ행' },
  { character: 'ケ', romaji: 'ke', type: 'katakana', row: 'カ행' },
  { character: 'コ', romaji: 'ko', type: 'katakana', row: 'カ행' },
  // サ행
  { character: 'サ', romaji: 'sa', type: 'katakana', row: 'サ행' },
  { character: 'シ', romaji: 'shi', type: 'katakana', row: 'サ행' },
  { character: 'ス', romaji: 'su', type: 'katakana', row: 'サ행' },
  { character: 'セ', romaji: 'se', type: 'katakana', row: 'サ행' },
  { character: 'ソ', romaji: 'so', type: 'katakana', row: 'サ행' },
  // タ행
  { character: 'タ', romaji: 'ta', type: 'katakana', row: 'タ행' },
  { character: 'チ', romaji: 'chi', type: 'katakana', row: 'タ행' },
  { character: 'ツ', romaji: 'tsu', type: 'katakana', row: 'タ행' },
  { character: 'テ', romaji: 'te', type: 'katakana', row: 'タ행' },
  { character: 'ト', romaji: 'to', type: 'katakana', row: 'タ행' },
  // ナ행
  { character: 'ナ', romaji: 'na', type: 'katakana', row: 'ナ행' },
  { character: 'ニ', romaji: 'ni', type: 'katakana', row: 'ナ행' },
  { character: 'ヌ', romaji: 'nu', type: 'katakana', row: 'ナ행' },
  { character: 'ネ', romaji: 'ne', type: 'katakana', row: 'ナ행' },
  { character: 'ノ', romaji: 'no', type: 'katakana', row: 'ナ행' },
  // ハ행
  { character: 'ハ', romaji: 'ha', type: 'katakana', row: 'ハ행' },
  { character: 'ヒ', romaji: 'hi', type: 'katakana', row: 'ハ행' },
  { character: 'フ', romaji: 'fu', type: 'katakana', row: 'ハ행' },
  { character: 'ヘ', romaji: 'he', type: 'katakana', row: 'ハ행' },
  { character: 'ホ', romaji: 'ho', type: 'katakana', row: 'ハ행' },
  // マ행
  { character: 'マ', romaji: 'ma', type: 'katakana', row: 'マ행' },
  { character: 'ミ', romaji: 'mi', type: 'katakana', row: 'マ행' },
  { character: 'ム', romaji: 'mu', type: 'katakana', row: 'マ행' },
  { character: 'メ', romaji: 'me', type: 'katakana', row: 'マ행' },
  { character: 'モ', romaji: 'mo', type: 'katakana', row: 'マ행' },
  // ヤ행
  { character: 'ヤ', romaji: 'ya', type: 'katakana', row: 'ヤ행' },
  { character: 'ユ', romaji: 'yu', type: 'katakana', row: 'ヤ행' },
  { character: 'ヨ', romaji: 'yo', type: 'katakana', row: 'ヤ행' },
  // ラ행
  { character: 'ラ', romaji: 'ra', type: 'katakana', row: 'ラ행' },
  { character: 'リ', romaji: 'ri', type: 'katakana', row: 'ラ행' },
  { character: 'ル', romaji: 'ru', type: 'katakana', row: 'ラ행' },
  { character: 'レ', romaji: 're', type: 'katakana', row: 'ラ행' },
  { character: 'ロ', romaji: 'ro', type: 'katakana', row: 'ラ행' },
  // ワ행
  { character: 'ワ', romaji: 'wa', type: 'katakana', row: 'ワ행' },
  { character: 'ヲ', romaji: 'wo', type: 'katakana', row: 'ワ행' },
  { character: 'ン', romaji: 'n', type: 'katakana', row: 'ワ행' },
  // 탁음 (ガ행)
  { character: 'ガ', romaji: 'ga', type: 'katakana', row: 'ガ행' },
  { character: 'ギ', romaji: 'gi', type: 'katakana', row: 'ガ행' },
  { character: 'グ', romaji: 'gu', type: 'katakana', row: 'ガ행' },
  { character: 'ゲ', romaji: 'ge', type: 'katakana', row: 'ガ행' },
  { character: 'ゴ', romaji: 'go', type: 'katakana', row: 'ガ행' },
  // 탁음 (ザ행)
  { character: 'ザ', romaji: 'za', type: 'katakana', row: 'ザ행' },
  { character: 'ジ', romaji: 'ji', type: 'katakana', row: 'ザ행' },
  { character: 'ズ', romaji: 'zu', type: 'katakana', row: 'ザ행' },
  { character: 'ゼ', romaji: 'ze', type: 'katakana', row: 'ザ행' },
  { character: 'ゾ', romaji: 'zo', type: 'katakana', row: 'ザ행' },
  // 탁음 (ダ행)
  { character: 'ダ', romaji: 'da', type: 'katakana', row: 'ダ행' },
  { character: 'ヂ', romaji: 'di', type: 'katakana', row: 'ダ행' },
  { character: 'ヅ', romaji: 'du', type: 'katakana', row: 'ダ행' },
  { character: 'デ', romaji: 'de', type: 'katakana', row: 'ダ행' },
  { character: 'ド', romaji: 'do', type: 'katakana', row: 'ダ행' },
  // 탁음 (バ행)
  { character: 'バ', romaji: 'ba', type: 'katakana', row: 'バ행' },
  { character: 'ビ', romaji: 'bi', type: 'katakana', row: 'バ행' },
  { character: 'ブ', romaji: 'bu', type: 'katakana', row: 'バ행' },
  { character: 'ベ', romaji: 'be', type: 'katakana', row: 'バ행' },
  { character: 'ボ', romaji: 'bo', type: 'katakana', row: 'バ행' },
  // 반탁음 (パ행)
  { character: 'パ', romaji: 'pa', type: 'katakana', row: 'パ행' },
  { character: 'ピ', romaji: 'pi', type: 'katakana', row: 'パ행' },
  { character: 'プ', romaji: 'pu', type: 'katakana', row: 'パ행' },
  { character: 'ペ', romaji: 'pe', type: 'katakana', row: 'パ행' },
  { character: 'ポ', romaji: 'po', type: 'katakana', row: 'パ행' },
];

export const katakanaRows = [
  'ア행', 'カ행', 'サ행', 'タ행', 'ナ행',
  'ハ행', 'マ행', 'ヤ행', 'ラ행', 'ワ행',
  'ガ행', 'ザ행', 'ダ행', 'バ행', 'パ행',
];
