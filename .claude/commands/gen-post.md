---
description: 投稿下書きを生成（ローカル・コピペ用）
argument-hint: "[柱 or トピック（任意）] [本数（任意, 既定3）]"
allowed-tools: Read, Write, Glob, Bash(date:*), Bash(curl:*)
---

投稿下書きを生成し、コピペできる形でローカルに保存する。

## 読み込む

ブランド資産は公開リポ `github.com/niqostudio/niqostudio` の `main` が正本。raw から取得する（公開リポなので認証不要）。ベース URL：
`https://raw.githubusercontent.com/niqostudio/niqostudio/main/marketing`

- `curl -fsSL <base>/brand/voice.md`・`<base>/brand/worldview.md`・`<base>/brand/audience.md`
- `curl -fsSL <base>/strategy/posting-strategy.md`
- `curl -fsSL <base>/history/x.md`・`<base>/history/note.md`（重複回避・学習）

このプロダクト固有の素材（ローカル）:
- `./marketing/source.md`

## 生成ルール

- `voice.md` の声・do/don't、`posting-strategy.md` の柱とアンチパターンに従う。
- `history/` を見て、最近と重複しない柱・切り口を選ぶ。
- **`source.md` の固有名・仮名・固有機構名を出力本文に出さない**（背景理解のためにのみ読む）。
- 1投稿＝1つのことに絞る。具体・実体験を根拠に。誇張しない。

## 引数

`$ARGUMENTS` があれば柱／トピック／本数として解釈する。無ければ `history/` を見て手薄な柱を選ぶ。短文の既定は3本。長文は明示指示時のみ。

## 出力

1. 日付を取得（`date +%Y-%m-%d`）。
2. `./marketing/drafts/<日付>-<柱orトピック>.md` に Write で保存。**各候補は履歴（`x.md` / `note.md`）へそのまま貼れるエントリ形式**で書く：

   **案A**
   `## <日付> / 柱: <柱名 or その他> / 形式: 単発 | スレッド`
   本文（X へはこの本文だけをコピペ。スレッドは各ポストを `---` で区切る）
   `反応メモ:`

   - 候補は `**案X**` で区切る（`---` はスレッド本文の区切り専用なので候補の区切りには使わない）。
   - 柱・形式は**ヘッダ行に書く**（HTML コメントのメタは使わない）。
3. 投稿後は、選んだ候補のブロック（`## …` から `反応メモ:` まで）を**そのまま** `niqostudio` の `marketing/history/x.md`（note は `note.md`）に貼り、本文だけを X／note に貼るよう促す。

## 禁止

- 下書きを `./marketing/drafts/` 以外へ書き出す。
- `source.md` の固有名を出力・履歴に残す。
