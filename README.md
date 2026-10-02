# monorepo-template

A starting point for NIQO STUDIO monorepos. It includes the shared conventions (writing style, comments, commits, secrets), style checks, CI, and tool versions.

## Structure

| Path | Purpose | Depends on |
| --- | --- | --- |
| `apps/*` | Applications | `packages/*` |
| `packages/*` | Code shared within this repository | — |
| `scripts/` | Repository operations, such as managing `.env` | — |

Code shared across repositories lives in [toolkit](https://github.com/niqostudio/toolkit) and is installed from npm.

## Commands

```sh
pnpm lint                      # type check and prose-lint
pnpm lint:prose [paths...]     # prose-lint only (code comments and tracked Markdown)
pnpm lint:prose --fix          # fix spacing and trailing-comment alignment in code comments
pnpm test                      # tests
node scripts/env.ts run <cmd>  # run a command with .env loaded
pnpm env:push [--dry-run]      # push .env values to GitHub Variables / Secrets
```

- Style rules and settings: [`@niqostudio/prose-lint`](https://www.npmjs.com/package/@niqostudio/prose-lint). Add `prose-lint.json` to the root only to change the defaults.
- Commit messages are checked by `.githooks/commit-msg`, enabled by `prepare` on `pnpm install`.
- `env:push` targets are defined in `TARGETS` in `scripts/env.ts`.

## Tooling

| File | Purpose |
| --- | --- |
| `mise.toml` | Node.js and Terraform versions (pnpm is pinned by `packageManager` in `package.json`) |
| `.github/workflows/ci.yaml` | Typecheck, Test, Prose lint, and Secret scan on pushes to `main` and on pull requests |
| `.github/dependabot.yaml` | Weekly update PRs for npm and GitHub Actions (minor and patch grouped) |
| `.gitleaks.toml` | Secret scan settings |
| `.editorconfig`, `.gitattributes` | Encoding, indentation, and LF line endings |

## Creating a repository from this template

This repository is a GitHub template. Click **Use this template** on GitHub, or run:

```sh
gh repo create niqostudio/<name> --template niqostudio/monorepo-template --private --clone
```

Then in the new repository:

1. Update `name` in `package.json` and the opening lines of `README.md` and `CLAUDE.md`.
2. Set `GITHUB_REPO` and `TARGETS` in `scripts/env.ts`, and `.env.example`.
3. Run `mise install`, `pnpm install`, `pnpm lint`, and `pnpm test`.
