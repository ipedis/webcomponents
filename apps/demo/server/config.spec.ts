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
      homeRedirect: DEFAULT_SERVER_CONFIG.homeRedirect,
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
        HOME_REDIRECT: '',
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
        HOME_REDIRECT: 'false',
        MATOMO_ENABLED: 'false',
        MATOMO_URL: 'https://matomo.example.com',
        MATOMO_SITE_ID: '12',
      }),
    ).toEqual({
      designSystemUrl: 'https://staging-design.example.com',
      homeRedirect: false,
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

  it('returns URLs in their normalized form', () => {
    const config = loadServerConfig({
      DESIGN_SYSTEM_URL: 'https://Design.Ipedis.com/a b/',
      MATOMO_URL: 'https:stats.example.com',
    });
    expect(config.designSystemUrl).toBe('https://design.ipedis.com/a%20b');
    expect(config.matomo.url).toBe('https://stats.example.com');
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
    [{ DESIGN_SYSTEM_URL: 'https://design.ipedis.com?a=1' }, /query/],
    [{ MATOMO_URL: 'https://ipedis.matomo.cloud/#x' }, /fragment/],
    [{ MATOMO_URL: 'https://stats.example.com/#' }, /fragment/],
    [{ DESIGN_SYSTEM_URL: 'https://design.ipedis.com/?' }, /query/],
    [{ MATOMO_URL: 'https://user:pass@ipedis.matomo.cloud' }, /credentials/],
    [{ MATOMO_ENABLED: 'yes' }, /MATOMO_ENABLED/],
    [{ HOME_REDIRECT: 'no' }, /HOME_REDIRECT/],
    [{ MATOMO_SITE_ID: 'abc' }, /MATOMO_SITE_ID/],
  ])('rejects %j', (env, message) => {
    expect(() => loadServerConfig(env)).toThrow(message);
  });
});
