# template

モノリポの雛形。規約（文体・コメント・コミット・秘密値）と、その検査の設定を持つ出発点

## Structure

| パス | 責務 | 依存 |
| --- | --- | --- |
| `apps/*` | 実行物 | `packages/*` |
| `packages/*` | リポの中で共有するコード | — |
| `scripts/` | リポの運用（`.env` の操作など） | — |

- 複数のリポで共有するものは toolkit のリポで管理し、npm から依存（このリポには置かない）

## Operations

| コマンド | 内容 |
| --- | --- |
| `pnpm check` | 型・テスト・文章の検査（集計のみ） |
| `pnpm lint:prose [パス...] [--fix]` | コード中のコメントと、git で追跡する Markdown の文体の検査。`--fix` は和欧間のスペースと行末コメントの開始位置だけ修正 |
| `node scripts/env.ts run <cmd>` | `.env` をロードしてコマンド実行 |
| `pnpm env:push [--dry-run]` | `.env` → GitHub Variables / Secrets。配信先は `scripts/env.ts` の `TARGETS` |

- 文体の検査の規則と設定: `@niqostudio/prose-lint`（toolkit の README）。変更する場合だけルートに `prose-lint.json`

## Creating a repo from this template

1. このリポを `.git` を除いて複製し、`git init`
2. `package.json` の `name`、`README.md`・`CLAUDE.md` の冒頭を変更
3. `scripts/env.ts` の `GITHUB_REPO`・`TARGETS` と `.env.example` を設定
4. `pnpm install` → `pnpm check`
