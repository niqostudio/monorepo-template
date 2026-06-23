# monorepo-template

pnpm + tsx + Node 24 のモノレポ・テンプレート。実験/新規プロジェクトの土台。

## 構成

```
apps/lp/     LP 雛形（Vite + React + Tailwind v4・空のスキャフォールド）
apps/*       実行物（web / api / cli …）
packages/*   横断共有（型・UI・ユーティリティ）
.claude/     コーディング/コミット規約（rules のみ追跡）
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

## 規約・衛生

- 規約は [.claude/rules/](.claude/rules/)（[conventions](.claude/rules/conventions.md) / [commit](.claude/rules/commit.md)）。
- 秘密値は追跡ファイルに置かない（`.env` は gitignore）。gitleaks で検出。
- ライセンスは MIT（[LICENSE](LICENSE)）。
