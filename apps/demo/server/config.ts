import {
  DEFAULT_APP_CONFIG,
  type PublicAppConfig,
} from '../src/app/core/config/app-config';

/**
 * Server configuration, read from environment variables.
 *
 * Every default is the current production value, so a deployment that sets
 * nothing behaves exactly as before. Invalid values stop the server at
 * startup instead of producing a broken CSP or redirect at runtime.
 *
 * Server-only settings would be added to this type; toPublicAppConfig()
 * keeps them out of the HTML. The path prefix is not a setting: it is read
 * from the build (see readBuiltBasePath).
 */
export type ServerConfig = PublicAppConfig;

type Env = Record<string, string | undefined>;

export const DEFAULT_SERVER_CONFIG: ServerConfig = DEFAULT_APP_CONFIG;

/**
 * The part of the configuration sent to the browser. Fields are copied one
 * by one so a server-only field can never leak into the HTML by accident.
 */
export function toPublicAppConfig(config: ServerConfig): PublicAppConfig {
  return {
    designSystemUrl: config.designSystemUrl,
    homeRedirect: config.homeRedirect,
    matomo: {
      enabled: config.matomo.enabled,
      url: config.matomo.url,
      siteId: config.matomo.siteId,
    },
  };
}

export function loadServerConfig(env: Env = process.env): ServerConfig {
  const defaults = DEFAULT_SERVER_CONFIG;
  return {
    designSystemUrl: readUrl(
      env,
      'DESIGN_SYSTEM_URL',
      defaults.designSystemUrl,
    ),
    homeRedirect: readBoolean(env, 'HOME_REDIRECT', defaults.homeRedirect),
    matomo: {
      enabled: readBoolean(env, 'MATOMO_ENABLED', defaults.matomo.enabled),
      url: readUrl(env, 'MATOMO_URL', defaults.matomo.url),
      siteId: readSiteId(env, 'MATOMO_SITE_ID', defaults.matomo.siteId),
    },
  };
}

/**
 * Loads a `.env` file from the working directory when there is one (local
 * development). Variables already set in the environment take precedence.
 */
export function loadLocalEnvFile(): void {
  try {
    process.loadEnvFile();
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
      throw error;
    }
  }
}

/** Returns the trimmed value, or undefined when the variable is unset or empty. */
function read(env: Env, name: string): string | undefined {
  const value = env[name]?.trim();
  return value ? value : undefined;
}

function readUrl(env: Env, name: string, fallback: string): string {
  const value = read(env, name) ?? fallback;
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`${name} must be an absolute URL, got "${value}".`);
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    throw new Error(`${name} must use http or https, got "${value}".`);
  }
  // Paths are appended to these URLs (back links, matomo.js), which a query,
  // a fragment or credentials would break without any error. The normalized
  // href is checked, not url.search and url.hash: those are empty for a bare
  // "?" or "#", which would still swallow the appended path.
  if (/[?#]/.test(url.href) || url.username || url.password) {
    throw new Error(
      `${name} must not contain a query, a fragment or credentials, got "${value}".`,
    );
  }
  // The normalized form, as validated: "https:host" becomes "https://host/".
  return url.href.replace(/\/+$/, '');
}

function readBoolean(env: Env, name: string, fallback: boolean): boolean {
  const value = read(env, name)?.toLowerCase();
  if (value === undefined) {
    return fallback;
  }
  if (value === 'true' || value === '1') {
    return true;
  }
  if (value === 'false' || value === '0') {
    return false;
  }
  throw new Error(`${name} must be true or false, got "${value}".`);
}

function readSiteId(env: Env, name: string, fallback: string): string {
  const value = read(env, name) ?? fallback;
  if (!/^\d+$/.test(value)) {
    throw new Error(`${name} must be a number, got "${value}".`);
  }
  return value;
}
