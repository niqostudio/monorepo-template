# CLAUDE.md

モノリポの雛形。構成・運用は [README.md](README.md)

## 規約

- 構成: パッケージの責務・制約・依存は README の「構成」に準拠
- エントリーポイント: パッケージごとに `src/index.ts`。export は外部で使用するものだけ・他パッケージの再 export なし
- 秘密値: ルート `.env` に集約し、配信は `pnpm env:push` に一本化。`.env`・`*.tfvars`・state はコミット禁止
- `.env.example`: 変数追加時は `scripts/env.ts` の `TARGETS` にも定義
- 個人名: リポに記載禁止（コード・コメント・ドキュメント・設定値すべて）

## 文体（README・コメント共通）

- 散文より構造化（表・箇条書き・キー: 値）
- 技術語彙（カタカナ語・漢語・漢語複合）で簡潔に
- コード上の値・環境変数の参照はコードの名前で、バッククォートで囲む。ドメインの概念・説明・表示文字列は日本語
- コメントは非自明な理由・制約のみ。書式は既存に準拠し、`pnpm lint:comments` で確認
  - 規則: `@niqostudio/lint`（`packages/lint`）
  - リポ固有の語彙: `lint.json` の `vocabulary`

## コミット

- Conventional Commits。type・scope は英語、subject は日本語
- subject は1行のみ。body は書かない（背景は PR に記載）
- Claude・AI の署名・trailer 禁止
