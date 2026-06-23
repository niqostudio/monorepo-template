# marketing — 発信下書き生成（プロダクトリポ側）

このプロダクト固有の発信素材と下書き置き場。ローカルで下書きを生成し、コピペで投稿する想定（投稿 API 連携は持たない）。要らなければ `marketing/` ごと削除してよい。

**声・世界観・戦略・投稿履歴といったブランド資産はここには置かない。** それらは公開リポ `github.com/niqostudio/niqostudio` の `marketing/`（`main`）が正本で、生成時に raw から取得する。ここに置くのはプロダクト固有の素材だけ。

## 構成

| パス | 役割 |
| --- | --- |
| `source.md` | このプロダクト固有の生成素材（固有名・仮名はここに留め、出力に出さない） |
| `drafts/` | 生成下書き（gitignore・WIP は追跡しない） |

## 使い方

1. `source.md` にこのプロダクト固有の発信素材を書く（出荷時は空）。
2. `pnpm gen:post`（または Claude Code で `/gen-post`）→ ブランド資産＋`source.md` を読んで `drafts/` に下書き生成。
3. 投稿後、本文を公開リポ `niqostudio` の `marketing/history/` に記録する。

生成コマンドは [`.claude/commands/gen-post.md`](../.claude/commands/gen-post.md)。
