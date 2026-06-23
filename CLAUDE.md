# CLAUDE.md

pnpm + tsx + Node 24 のモノレポ・テンプレート。実験・新規プロジェクトの土台にする。
アプリは `apps/`、横断共有は `packages/` に置く。

## スタック

- パッケージマネージャ: **pnpm**（ワークスペース）
- ランタイム: **Node 24**（`.nvmrc`）
- 言語: **TypeScript**（`tsconfig.base.json` を各 package が `extends`）
- TS 実行: **tsx**（`pnpm tsx <file>.ts` で直接実行）

## 構成

| パス | 役割 |
| --- | --- |
| `apps/*` | 実行物（web / api / cli 等） |
| `packages/*` | 横断共有（型・UI・ユーティリティ） |
| `packages/brand` | デザイントークン・ブランド設定の集約先（`@app/brand`・出荷時は空のガワ） |

各アプリ/パッケージは自身の `package.json` を持ち、`typecheck` / `build` / `test` / `dev` を実装すると root の `pnpm -r` 集約スクリプトに乗る。

## LP（`apps/lp`・同梱の雛形）

新規プロジェクトでは LP をほぼ必ず置くので、**空の LP 雛形を同梱**している。

雛形は **Vite + React + Tailwind v4 が動くだけの空のスキャフォールド**。デザイン・レイアウト・
配色・コピーは持たない。LP はプロダクトごとに毎回ゼロから生成する（共通のデザイン作法・
デザイントークンは意図的に残していない）。

- スタック: **Vite + React + Tailwind v4**。
- 生成の起点: `src/App.tsx`（空）・`src/index.css`（`@import "tailwindcss"` のみ）。
- `package.json` の name は `@app/lp` → 必要に応じて自分のスコープへ。

```sh
pnpm --filter @app/lp dev        # プレビュー
pnpm --filter @app/lp build
pnpm --filter @app/lp typecheck
```

## 規約

- コーディング: [.claude/rules/conventions.md](.claude/rules/conventions.md)
- コミット: [.claude/rules/commit.md](.claude/rules/commit.md)

## 衛生

- **秘密の値を追跡ファイルに置かない**（`.env` は gitignore・CI Secret で注入）。
- **gitleaks**（`.gitleaks.toml`）で漏洩を検出。CI は `.github/workflows/verify.yml`。

## 使い方

```sh
pnpm install
pnpm -r run typecheck   # build / test / dev も同様
```

新しいアプリは `apps/<name>/`、共有は `packages/<name>/` に追加する。
