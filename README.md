# Ipedis web components

[Figma](https://www.figma.com/design/uU1M7tmg5al3bFKhUOL32j/Ipedis-Components?node-id=3-66&m=dev)

[Design System](https://design.ipedis.com/5dda74a23/p/896b0d-tooltip)

## How to contribute

TODO

### install dependencies

first you will need [jq](https://jqlang.github.io/jq/download/)

```bash
sudo apt-get install jq # linux
```

```bash
brew install jq # MacOS
```

```bash
npm i -g nx
npm i
```

you can now build lint and test all packages

```bash
npm run build
npm run lint
npm run test
npm run e2e
```

### create a new component

Execute the following command to create a new component, it will create component `foo` in the packages folder

```bash
bin/create-component.sh foo
```

You can now run for this particular component

```bash
## Build the component foo
nx build foo
## lint the component foo and fix the issues
nx lint foo --fix
## run .spec.ts test for the component foo
nx test foo
## run .e2e.ts test for the component foo
nx e2e foo
## run the component foo in the browser
nx serve foo
```

## Demo configuration

The demo (`apps/demo`) is an Angular SSR app served by Express. Its server reads the
environment variables below at startup (`apps/demo/server/config.ts`). Every default is
the production value, so staging and production need no variable at all.

For local development, copy the example file. It disables Matomo, so your visits are not
tracked:

```bash
cp .env.example .env
nx serve demo # or: npm run demo:ssr
```

Variables already set in the environment take precedence over `.env`. An invalid value
(for example `MATOMO_ENABLED=yes`) stops the server at startup with an explicit error.

| Variable            | Default                       | Used for                                                                                                                                     |
| ------------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `PORT`              | `4000`                        | Port of the Node server (`npm run demo:ssr`, Docker image)                                                                                   |
| `IP`                | `0.0.0.0`                     | Interface the Node server listens on                                                                                                         |
| `BASE_PATH`         | `/webcomponents`              | Path prefix of the app. Must match `baseHref` in `apps/demo/project.json`, which is fixed at build time; a mismatch is logged at startup     |
| `DESIGN_SYSTEM_URL` | `https://design.ipedis.com`   | "Back" links, home redirects and CSP `frame-ancestors`                                                                                       |
| `MATOMO_ENABLED`    | `true`                        | `false` loads no tracker and removes Matomo from the CSP                                                                                     |
| `MATOMO_URL`        | `https://ipedis.matomo.cloud` | Matomo instance, for the tracker and the CSP                                                                                                 |
| `MATOMO_SITE_ID`    | `71`                          | Matomo site id                                                                                                                               |
| `NG_ALLOWED_HOSTS`  | none                          | Comma-separated hosts accepted by Angular SSR, added to `localhost` and `*.ipedis.com` from `apps/demo/project.json`. Read by Angular itself |

`DESIGN_SYSTEM_URL` and the Matomo settings are written into the rendered HTML for the
browser (`APP_CONFIG`): only public values belong there.
