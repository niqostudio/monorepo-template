# template

モノリポの雛形。規約（文体・コメント・コミット・秘密値）と、その検査を共有

## 構成

| パス | 責務 | 制約 | 依存 |
| --- | --- | --- | --- |
| `apps/*` | 実行物 | — | `packages/*` |
| [packages/lint](packages/lint) | 文体の規則（語彙・和欧間・句読点・括弧）と、コメント・ドキュメントの検査 | 規則の追加は共通の語彙のみ。リポ固有の語彙は各リポの `lint.json` | — |
| `scripts/` | リポの運用（`.env` の操作など） | — | — |

## 運用

| コマンド | 内容 |
| --- | --- |
| `pnpm check` | 型・テスト・コメントの検査（集計のみ） |
| `pnpm lint:comments [パス...] [--fix]` | コメント・ドキュメントの検査。`--fix` は和欧間のスペースと行末コメントの開始位置だけ修正 |
| `node scripts/env.ts run <cmd>` | `.env` をロードしてコマンド実行 |
| `pnpm env:push [--dry-run]` | `.env` → GitHub Variables / Secrets。配信先は `scripts/env.ts` の `TARGETS` |

## 検査の設定（`lint.json`）

| キー | 内容 | 既定 |
| --- | --- | --- |
| `paths` | 対象のディレクトリ（git の追跡対象のみ） | `apps`・`packages`・`scripts` |
| `docs` | 同じ規則で検査する Markdown | `README.md`・`CLAUDE.md` |
| `extensions` | 行頭のコメントを検査する拡張子 | `ts`・`tsx`・`astro`・`tf` |
| `skip` | 対象外のパス（正規表現） | `.tmp/`・`worker-configuration.d.ts` |
| `trailingFiles` | 説明を行末コメントで書くファイル（正規表現）。開始位置を統一 | `schema.ts` |
| `vocabulary` | リポ固有の語彙 `{ re, flags?, to }` | なし |

## 雛形からの作成

1. このリポを複製し、`package.json` の `name`・`README.md`・`CLAUDE.md` の冒頭を変更
2. `packages/lint` は複製せず、雛形のパッケージを参照（規約の更新を1か所に集約）
   - `package.json`: `"@niqostudio/lint": "link:<雛形のパス>/packages/lint"`
   - スクリプト: `node node_modules/@niqostudio/lint/src/cli.ts`
3. `scripts/env.ts` の `GITHUB_REPO`・`TARGETS` と `.env.example` を設定
