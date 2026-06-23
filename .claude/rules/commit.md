# Commit Rule

コミットメッセージは [Conventional Commits](https://www.conventionalcommits.org/) に従う。

## フォーマット

```
<type>(<scope>): <subject>

<body>

<footer>
```

- **type**: 必須。下記一覧から選ぶ。
- **scope**: 任意。変更したアプリ/パッケージ（例: `web` / `api` / `ui`）。
- **subject**: 必須。日本語で簡潔に。末尾に句点を付けない。50 文字以内を目安。
- **body**: 任意。「何を・なぜ」。1 行 72 文字以内を目安に折り返す。
- **footer**: 任意。破壊的変更や Issue 参照（例: `Closes #123`）。

## type 一覧

| type | 用途 |
| --- | --- |
| `feat` | 新機能・追加 |
| `fix` | バグ・設定ミスの修正 |
| `docs` | ドキュメントのみ |
| `style` | 動作に影響しない整形 |
| `refactor` | 挙動を変えないコード/構成変更 |
| `perf` | パフォーマンス改善 |
| `test` | テストの追加・修正 |
| `build` | ビルド・依存関係 |
| `ci` | CI 設定・スクリプト |
| `chore` | その他の雑務 |
| `revert` | 以前のコミットの取り消し |

## ルール

1. 1 コミット = 1 つの論理的な変更。
2. 破壊的変更は type の後に `!`、または footer に `BREAKING CHANGE:`。
3. 日本語で統一する（type / scope は英語、subject / body は日本語）。
4. WIP コミットを既定ブランチに残さない。
5. **シークレットの値（API トークン・キー・接続文字列・state 等）を絶対にコミットしない。**
6. コミットに Claude / AI 名義を残さない。
   - `Co-Authored-By: Claude ...` 等の trailer を付けない。
   - `🤖 Generated with Claude Code` のような署名・絵文字を入れない。
   - author / committer は必ずユーザー本人の git 設定にする。
