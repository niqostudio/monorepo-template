// 和欧間のアキ（JIS X 4051の四分アキ相当）をノーブレークスペースで挿入
// - ノーブレーク: アキは語の区切りでない（「E2E テスト」で改行されると読みにくい）
// - 原稿: 入力しない（表示時に挿入）
// - CSS の `text-autospace`: 不採用（ブラウザ差あり・OG 画像・RSS・meta description に無効）→ 表示側の1か所で文字列に挿入
// - 対象外: コード（インラインコード・コードブロック）・URL・メールアドレス

// 和文 = ひらがな・カタカナ・漢字・々ー
// 約物（句読点・括弧・中黒）は詰めたまま
const CJK = '\\u3005\\u3006\\u30fc\\u3041-\\u3096\\u30a1-\\u30fa\\u3400-\\u9fff\\uf900-\\ufaff';
// 欧文の語 = 英数字と、語中に現れる記号（2026-02-24・13,866・33.7%・GPT-5 など）
const WORD = 'A-Za-z0-9%.,:\\-';

// 数字だけの語（単位・日付・章番号）は詰め、英字を含む語だけ空ける
// - 例: `16人`・`2026年2月`・`第1章`・`30%`
const hasLetter = (word: string) => /[A-Za-z]/.test(word);
const trim = (word: string) => word.replace(/[.,:\-]+$/, '');

// 原稿に手で入ったスペースも対象（入力の有無によらず同じ結果にするため、空けるか詰めるかを再判定）
const BEFORE_RE = new RegExp(`([${CJK}])[ \u00a0]?([${WORD}]+)`, 'g');
const AFTER_RE = new RegExp(`([${WORD}]+)[ \u00a0]?([${CJK}])`, 'g');

export const autoSpace = (text: string): string =>
  text
    .replace(BEFORE_RE, (_m, cjk: string, word: string) => (hasLetter(word) ? `${cjk}\u00a0${word}` : `${cjk}${word}`))
    .replace(AFTER_RE, (_m, word: string, cjk: string) => (hasLetter(trim(word)) ? `${word}\u00a0${cjk}` : `${word}${cjk}`));

// 原稿に手入力された和欧間のスペース（表示側で挿入 → 不要）
const MANUAL_RE = new RegExp(`([${CJK}]) [${WORD}]|[${WORD}] ([${CJK}])`);
export const hasManualSpace = (text: string) => MANUAL_RE.test(text);

// 原稿から和欧間のスペースを除去（表示時に挿入 → 原稿には不要）
export const stripManualSpace = (text: string): string =>
  text.replace(new RegExp(`([${CJK}]) ([${WORD}])`, 'g'), '$1$2').replace(new RegExp(`([${WORD}]) ([${CJK}])`, 'g'), '$1$2');
