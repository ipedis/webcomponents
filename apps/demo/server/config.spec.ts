import {
  DEFAULT_SERVER_CONFIG,
  loadServerConfig,
  toPublicAppConfig,
} from './config';

describe('toPublicAppConfig', () => {
  it('keeps only the fields meant for the browser', () => {
    const config = { ...DEFAULT_SERVER_CONFIG, secret: 'do-not-leak' };
    expect(toPublicAppConfig(config)).toEqual({
      designSystemUrl: DEFAULT_SERVER_CONFIG.designSystemUrl,
      matomo: DEFAULT_SERVER_CONFIG.matomo,
    });
  });
});

describe('loadServerConfig', () => {
  it('returns the production values when nothing is set', () => {
    expect(loadServerConfig({})).toEqual(DEFAULT_SERVER_CONFIG);
  });

  it('treats empty values as unset', () => {
    expect(
      loadServerConfig({
        DESIGN_SYSTEM_URL: '  ',
        MATOMO_ENABLED: '',
        MATOMO_URL: '',
        MATOMO_SITE_ID: '',
      }),
    ).toEqual(DEFAULT_SERVER_CONFIG);
  });

  it('reads every variable', () => {
    expect(
      loadServerConfig({
        DESIGN_SYSTEM_URL: 'https://staging-design.example.com',
        MATOMO_ENABLED: 'false',
        MATOMO_URL: 'https://matomo.example.com',
        MATOMO_SITE_ID: '12',
      }),
    ).toEqual({
      designSystemUrl: 'https://staging-design.example.com',
      matomo: {
        enabled: false,
        url: 'https://matomo.example.com',
        siteId: '12',
      },
    });
  });

  it('removes trailing slashes from URLs', () => {
    const config = loadServerConfig({
      DESIGN_SYSTEM_URL: 'https://design.ipedis.com/',
      MATOMO_URL: 'https://ipedis.matomo.cloud//',
    });
    expect(config.designSystemUrl).toBe('https://design.ipedis.com');
    expect(config.matomo.url).toBe('https://ipedis.matomo.cloud');
  });

  it.each([
    ['true', true],
    ['TRUE', true],
    ['1', true],
    ['false', false],
    ['False', false],
    ['0', false],
  ])('reads MATOMO_ENABLED=%s as %s', (value, expected) => {
    expect(loadServerConfig({ MATOMO_ENABLED: value }).matomo.enabled).toBe(
      expected,
    );
  });

  it.each([
    [{ DESIGN_SYSTEM_URL: 'design.ipedis.com' }, /DESIGN_SYSTEM_URL/],
    [{ DESIGN_SYSTEM_URL: 'ftp://design.ipedis.com' }, /http or https/],
    [{ MATOMO_URL: 'not a url' }, /MATOMO_URL/],
    [{ MATOMO_ENABLED: 'yes' }, /MATOMO_ENABLED/],
    [{ MATOMO_SITE_ID: 'abc' }, /MATOMO_SITE_ID/],
  ])('rejects %j', (env, message) => {
    expect(() => loadServerConfig(env)).toThrow(message);
  });
});
