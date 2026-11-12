---
name: upgrade-frontend-deps
description: Upgrades the dependencies of the webcomponents Nx monorepo (Stencil web components, Angular wrappers, Angular SSR demo). Nx first through the official nx migrate guide, which also carries Angular, then every other package to the latest version Nx and Angular support, while resolving the open Dependabot PRs and npm security alerts. Use when the user asks to upgrade, bump or update the dependencies, Nx, Angular or Stencil, or to clear Dependabot PRs or npm vulnerabilities. Never changes the Node version.
---

# Upgrade Frontend Dependencies

## Overview

Repeatable procedure to bring the workspace up to date. The order is fixed:

1. **Nx first**, with `nx migrate` as described in the Nx guide ([Automate updating dependencies](https://nx.dev/docs/features/automate-updating-dependencies)). Nx owns the versions of the `@nx/*` plugins and of Angular (`@nx/angular` pins the Angular version it supports), and runs their code migrations.
2. **Every other package**, up to the latest version that Nx, Angular and Stencil support.

Along the way the open Dependabot PRs and npm security alerts are cross-checked and resolved when possible.

## Running commands: always with the pinned Node

Every Node command (`npm`, `npx`, `nx`) goes through the script below, from the repository root. It loads the Node version of `.nvmrc` through nvm and refuses to run on any other version:

```bash
N=.claude/skills/upgrade-frontend-deps/scripts/node.sh
$N npm outdated          # any command, at the repository root
$N check                 # lint + unit tests + e2e + build, Nx cache disabled
$N                       # interactive shell
RESET=1 $N check         # rm -rf node_modules && npm ci first, like CI
```

- `check` runs `npm run lint && npm run test && npm run e2e && npm run build` with `NX_SKIP_NX_CACHE=true`, so a cached success from before the upgrade never hides a failure.
- e2e uses Playwright. After any change of `@playwright/test`, run `$N npx playwright install` before `check`.
- The Stencil build regenerates the Angular proxies of the `*-angular` packages (tracked files). After each `check`, `git status` must only show changes explained by the upgrade; a regenerated proxy is legitimate only if the new Stencil or output target version changed its output, and goes in the same commit.
- Never use `npm run lint:update` for validation: it runs Prettier and `--fix` on the whole tree and pollutes the diff.

`git` and `gh` stay as they are: they do not depend on Node.

## Fixed rules

- Package manager is **npm** (`package-lock.json`). Never run `yarn` or `pnpm`, never create another lock file.
- Node is pinned to the version of `.nvmrc`, also used by `engines.node` in `package.json`, `node:<version>-alpine` in `apps/demo/docker/Dockerfile` and CI (`node-version-file: '.nvmrc'`). The three must match; if they do not, stop and report. Changing the Node version is out of scope unless the user agrees. `@types/node` stays on the Node major.
- **Never use `ng update` for Angular**, and never bump `nx`, `@nx/*` or `@angular/*` by hand with `npm install`: in an Nx workspace they move through `nx migrate`.
- Do not use `npm run migrate` as is: it chains `nx migrate latest` and `--run-migrations` without installing nor reviewing in between, and jumps several majors at once.
- Commit locally after each step that leaves the tree green. **Never push, open a PR, comment on a PR, or close a PR without explicit confirmation from the user.**
- Keep the version form already used in `package.json`: exact versions for most packages (install with `--save-exact`), `^` where it is already used (`@jsverse/transloco`, `eslint-plugin-prettier`, `@angular/localize`...), `~` for `rxjs`.
- GitHub Actions versions are out of scope.

## Procedure

### 1. Preflight

1. `git status` must be clean, otherwise stop and ask. Create `chore/deps-upgrade-<YYYY-MM-DD>` from an up-to-date `main`.
2. Check that the three Node versions match (see fixed rules) and that `$N node -v` answers. Run `$N npm ci` if `node_modules` is missing or out of date, then `$N npx playwright install`.
3. Record the baseline: run `$N check` once before touching anything. If it is already red, stop and report, do not mix pre-existing failures with upgrade failures.
4. `gh auth status` must be logged in. Read the Dependabot inputs (read-only) and keep them for steps 4 and 5:
   - Open PRs: `gh pr list --author 'app/dependabot' --state open --json number,title,headRefName`, keep the `dependabot/npm_and_yarn/` branches. The repository has no `.github/dependabot.yml`: there may be no version PRs, only security PRs.
   - Open alerts: `gh api 'repos/{owner}/{repo}/dependabot/alerts?state=open&ecosystem=npm&per_page=100' --paginate`.
   - If an endpoint is not enabled, say so and move on. Do not treat that as a failure.

### 2. Nx first (and Angular with it)

Follow the Nx guide, one major at a time.

1. Find the target: `$N npm view nx dist-tags --json` (use `latest`, never `next` or `canary`). If `nx` is already at the latest, say so and still check step 2.6, then go to step 3.
2. Read the Nx release notes and the breaking changes of each major crossed, and those of `@nx/angular` (the Angular version it brings). Report what touches this codebase before running the migration.
3. Check the runtime and the plugins before migrating:
   - `$N npm view nx@<v> engines --json` must accept the pinned Node. If not, stop and ask.
   - `@nxext/stencil` is a community plugin, released after Nx: `$N npm view @nxext/stencil versions --json` and `$N npm view @nxext/stencil@<latest> peerDependencies --json`. If no release supports the target Nx major, stop at the highest Nx major it supports and report it.
4. Generate the migration, one major at a time (`<v>` is the next major if several are crossed, the target otherwise):
   ```bash
   $N npx nx migrate <v>
   ```
   It only updates `package.json` and writes `migrations.json`. Review both: `nx`, all `@nx/*` and the `@angular/*` packages must move together. To decide on the optional Angular major yourself, use `$N npx nx migrate <v> --interactive` and report the choice.
5. Install, then run the migrations:
   ```bash
   $N npm install
   $N npx nx migrate --run-migrations
   $N npx nx reset
   ```
   Let the migrations run, do not hand-edit versions. Delete `migrations.json` once applied (it is not versioned in this repository).
6. Align what Nx does not move: `@angular/cdk` and `@angular/material` through `$N npx nx migrate @angular/material@<v>` (Nx runs their `ng update` schematics), then `--run-migrations` like above; `@nxext/stencil` to the version checked in 2.3 (`$N npx nx migrate @nxext/stencil@<v>` so its migrations run). Check afterwards that every `@angular/*`, `@angular-devkit/*`, `@schematics/angular` and `@angular/build` / `@angular/ssr` / `@angular/cli` is on the version paired with the new Angular.
7. `$N check`. Fix what the migration broke, staying inside the requested scope. Commit: `chore(deps): upgrade Nx to <v> and Angular to <v>`. Repeat from 2.4 for the next major.

### 3. Every other package, up to what Nx and Angular support

1. List candidates without changing anything: `$N npm outdated --long` (or `$N npx npm-check-updates --format group`).
2. For each candidate, the version to install is the **highest version whose peer and engine ranges accept what step 2 installed**. Read them, do not guess: `$N npm view <pkg>@<version> peerDependencies engines --json`. Constraints to always check:
   - `typescript` against `@angular/compiler-cli`, `@angular/build`, `typescript-eslint` and `@stencil/core`;
   - `rxjs` against `@angular/core` (the demo runs without zone.js: do not add it back);
   - Stencil family: `@stencil/core`, `@stencil/sass`, `@stencil/playwright`, `@stencil/angular-output-target` against `@nxext/stencil`. `@stencil/angular-output-target` is wrapped by `tools/stencil-angular-output-target.mjs` (event forwarding workaround): read its changelog, and check whether the workaround is still needed or still works;
   - Jest family together: `jest`, `jest-cli`, `jest-util`, `jest-environment-jsdom`, `@types/jest`, against `jest-preset-angular`, `ts-jest`, `@nx/jest` and `jest-stencil-runner`;
   - `@playwright/test` against `@nx/playwright` and `@stencil/playwright`;
   - `angular-eslint` and `@angular-eslint/*` (same version) against Angular and ESLint; `eslint`, `@eslint/js`, `@eslint/eslintrc`, `typescript-eslint`, `@typescript-eslint/*`, `eslint-plugin-jest`, `eslint-plugin-playwright` against `@nx/eslint-plugin`;
   - `prettier` with `eslint-plugin-prettier` and `eslint-config-prettier`;
   - Angular libraries whose major follows Angular: `@jsverse/transloco`, `ngx-highlightjs`;
   - `@swc/core`, `@swc/helpers`, `@swc-node/register` and `ts-node` against `@nx/js`;
   - `express` with `@types/express`, `compression` with `@types/compression`, used by the SSR server of the demo.
   - If the latest release of a package is not supported, take the newest one that is, and record the reason in the report.
3. Apply by group, one commit per group, validating each time with `$N check`:
   1. patch and minor bumps,
   2. major bumps, one package (or one tightly coupled family such as Jest, Stencil, `angular-eslint`, ESLint) at a time, reading its migration notes first. If the package ships Nx migrations or `ng update` schematics, use `$N npx nx migrate <pkg>@<v>` then `--run-migrations`.
   - Command: `$N npm install <pkg>@<version> --save-exact` (add `-D` for a `devDependencies` package; drop `--save-exact` for a package that already uses `^` or `~`, and keep its prefix).
   - Commit: `chore(deps): upgrade dependencies (patch and minor)` or `chore(deps): upgrade <pkg> to <major>`.
4. Review the `overrides` block of `package.json` (currently `vite`, and `undici` under `nx`): if the parent now pulls a version at or above the pinned one, remove the override and validate. Otherwise keep it and say why in the report.
5. After a failure: one focused fix attempt (root cause, not a pin by reflex). If it still fails, revert that group's commit, reinstall with `$N npm ci`, keep the package at its previous version, and add it to the "deferred" list of the report with the failing output. Do not stack further groups on a red tree.

### 4. Dependabot PRs

For each open npm PR collected in step 1, compare its target version with what is now installed (`$N npm ls <pkg> --all`) and `package.json`:

- **Resolved** (installed version is greater than or equal to the PR target): candidate to close as superseded.
- **Not resolved because Nx, Angular or Stencil does not support it**: leave open, explain why in the report.
- **Not resolved because the upgrade failed**: leave open, link it to the deferred entry.

Present the three lists to the user. Only after confirmation, close the resolved ones with `gh pr close <n> --comment "Superseded by the dependency upgrade (<branch or PR>)."`. For unsupported versions, propose (do not post) `@dependabot ignore this major version` or `@dependabot ignore this minor version`.

### 5. Security alerts

For each open npm alert:

1. Check whether steps 2 and 3 already fixed it: the installed version (`$N npm ls <pkg> --all`) is at or above `first_patched_version`.
2. If not and the package is **transitive**: `$N npm update <pkg>` (updates within existing ranges). If a range blocks it, upgrade the direct parent to a release that pulls the patched version. Only as a last resort, add an entry to `overrides`, with a line in the report saying why and when to remove it.
3. If it is a **direct** dependency, bump it within the supported range like in step 3.
4. If no patched version exists or the patch is not compatible, do not force it: list it as "unfixable for now" with the advisory link, severity and the blocking constraint.
5. Cross-check with `$N npm audit` and report differences. Never run `npm audit fix --force`.
6. `$N check`, then commit: `fix(deps): patch vulnerable dependencies`. Do not dismiss alerts by hand: they close themselves once the fix reaches `main`.

### 6. Final validation and report

1. Prove the lock file is consistent the way CI does, from an empty `node_modules`: `RESET=1 $N check`. Then build the demo image like the ship workflows: `docker build -f apps/demo/docker/Dockerfile -t webcomponents-deps-check .` (remove the image afterwards).
2. `git diff --stat main` must only show `package.json`, `package-lock.json`, the files touched by Nx and Angular migrations, regenerated Angular proxies, and fixes required by the upgrade. `migrations.json` must not appear. Anything else needs an explanation.
3. Report, in this order:
   - Nx and Angular: from version to version, migrations applied, code fixes made.
   - `@nxext/stencil` and Stencil: versions, and the status of the `stencil-angular-output-target.mjs` workaround.
   - Other packages: upgraded (from, to), held back (which peer or engine range blocks it), deferred (failing output).
   - `overrides`: removed or kept, and why.
   - Dependabot PRs: resolved, left open with reason.
   - Alerts: fixed, still open with the blocking constraint.
   - Checks that could not be run and why.
4. Ask the user whether to push the branch and open the PR against `main`. Do not do it unprompted. If asked, the PR description lists the PRs and alerts it resolves.

## Red flags

- Running `npm`, `npx` or `nx` without `node.sh`, on another Node version.
- Running `ng update`, or bumping `nx`, `@nx/*` or `@angular/*` with `npm install` instead of `nx migrate`.
- Crossing several Nx majors in one `nx migrate`, or upgrading Nx beyond what `@nxext/stencil` supports.
- Running `--run-migrations` before `npm install`, or committing `migrations.json`.
- Bumping a package beyond the peer ranges of Nx, Angular or Stencil "because it is the latest".
- Trusting a green `check` served from the Nx cache.
- Mixing patch, minor and major bumps in one commit, which makes a red build impossible to bisect.
- Adding an `overrides` entry without trying to upgrade the parent first.
- Editing `package-lock.json` by hand or deleting it to "start fresh".
- Widening the scope: refactors, style changes, Node or GitHub Actions changes made "while we are here".
