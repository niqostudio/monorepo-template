# monorepo-template

pnpm + tsx + Node 24 のモノレポ・テンプレート。実験/新規プロジェクトの土台。

## 構成

```
apps/lp/     LP 雛形（Vite + React + Tailwind v4・空のスキャフォールド）
apps/*       実行物（web / api / cli …）
packages/*   横断共有（型・UI・ユーティリティ）
marketing/   発信下書きの素材と下書き置き場（任意・ブランド資産は別リポ）
.claude/     コーディング/コミット規約（rules）＋カスタムコマンド（commands）
.github/     CI（verify: install → typecheck → build → test ＋ gitleaks）
```

LP は空のスキャフォールドのみ同梱。デザイン・配色・コピーは持たず、プロダクトごとに毎回ゼロから生成する。

## はじめ方

```sh
# Node を .nvmrc に合わせる（24）
nvm use

pnpm install
pnpm -r run typecheck
pnpm --filter @app/lp dev   # LP プレビュー
```

新規アプリ:

```sh
mkdir -p apps/web && cd apps/web && pnpm init
# package.json に typecheck / build / dev / test を実装すると root の pnpm -r 集約に乗る
```

## 導入後に変更する箇所

テンプレから新規プロジェクトを起こしたら、以下を差し替える。

- ルート `package.json` の `name`（`monorepo-template` → プロジェクト名）。
- 各 package の `name` スコープ（`@app/*` → 自分のスコープ）。
- この `README.md` のタイトル・説明。
- `LICENSE` と `package.json` の `license`（権利者・年・ライセンス種別を案件に合わせる）。
- `packages/brand`（`@app/brand`）にデザイントークン・ブランド設定を定義（出荷時は空）。
- LP（`apps/lp`）はデザイン・コピーを持たない。プロダクトごとに毎回ゼロから生成する。
- `marketing/source.md` にこのプロダクト固有の発信素材を書く（出荷時は空）。発信が不要なら `marketing/` ごと削除。

## 発信（gen-post・任意）

X・note 等の投稿下書きをローカル生成し、コピペで投稿するための薄い仕組み。

- 声・世界観・戦略・投稿履歴といった**ブランド資産は公開リポ `github.com/niqostudio/niqostudio` の `marketing/` が正本**（生成時に raw から取得）。このリポには**プロダクト固有の `marketing/source.md` と `marketing/drafts/` だけ**を置く。
- 生成: `pnpm gen:post`（Claude Code CLI の `/gen-post` を実行）。ブランド資産＋`source.md` を読み、`marketing/drafts/`（gitignore）に下書きを出力する。
- 投稿後、本文をブランド資産側の `history/` に記録する。
- 前提: Claude Code CLI がインストール済み・認証済みであること。詳細は [`marketing/README.md`](marketing/README.md)。

## 規約・衛生

- 規約は [.claude/rules/](.claude/rules/)（[conventions](.claude/rules/conventions.md) / [commit](.claude/rules/commit.md)）。
- 秘密値は追跡ファイルに置かない（`.env` は gitignore）。gitleaks で検出。
- ライセンスは MIT（[LICENSE](LICENSE)）。
