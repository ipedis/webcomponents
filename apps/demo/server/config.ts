/**
 * Server configuration, read from environment variables.
 *
 * Every default is the current production value, so a deployment that sets
 * nothing behaves exactly as before. Invalid values stop the server at
 * startup instead of producing a broken CSP or redirect at runtime.
 */
export interface ServerConfig {
  /** Path prefix the app is served under; must match `baseHref` in project.json. */
  basePath: string;
  designSystemUrl: string;
  matomo: {
    enabled: boolean;
    url: string;
    siteId: string;
  };
}

type Env = Record<string, string | undefined>;

export const DEFAULT_SERVER_CONFIG: ServerConfig = {
  basePath: '/webcomponents',
  designSystemUrl: 'https://design.ipedis.com',
  matomo: {
    enabled: true,
    url: 'https://ipedis.matomo.cloud',
    siteId: '71',
  },
};

export function loadServerConfig(env: Env = process.env): ServerConfig {
  const defaults = DEFAULT_SERVER_CONFIG;
  return {
    basePath: readBasePath(env, 'BASE_PATH', defaults.basePath),
    designSystemUrl: readUrl(
      env,
      'DESIGN_SYSTEM_URL',
      defaults.designSystemUrl,
    ),
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
  return value.replace(/\/+$/, '');
}

function readBasePath(env: Env, name: string, fallback: string): string {
  const value = (read(env, name) ?? fallback).replace(/\/+$/, '');
  if (!/^\/[\w\-/]+$/.test(value)) {
    throw new Error(
      `${name} must be a path such as "/webcomponents", got "${value}".`,
    );
  }
  return value;
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
