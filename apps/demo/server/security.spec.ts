import { DEFAULT_SERVER_CONFIG, type ServerConfig } from './config';
import { cspDirectives } from './security';

function withMatomo(enabled: boolean): ServerConfig {
  return {
    ...DEFAULT_SERVER_CONFIG,
    matomo: { ...DEFAULT_SERVER_CONFIG.matomo, enabled },
  };
}

describe('cspDirectives', () => {
  const matomoUrl = DEFAULT_SERVER_CONFIG.matomo.url;

  it('allows Matomo when it is enabled', () => {
    const directives = cspDirectives(withMatomo(true));
    expect(directives['script-src']).toContain(matomoUrl);
    expect(directives['img-src']).toContain(matomoUrl);
    expect(directives['connect-src']).toContain(matomoUrl);
  });

  it('leaves Matomo out when it is disabled', () => {
    const directives = cspDirectives(withMatomo(false));
    expect(JSON.stringify(directives)).not.toContain(matomoUrl);
  });

  it('lets the design system site frame the demos', () => {
    const directives = cspDirectives({
      ...DEFAULT_SERVER_CONFIG,
      designSystemUrl: 'https://staging-design.example.com',
    });
    expect(directives['frame-ancestors']).toEqual([
      "'self'",
      'https://staging-design.example.com',
    ]);
  });

  it('uses origins, so URLs with a path still match their files', () => {
    const directives = cspDirectives({
      ...DEFAULT_SERVER_CONFIG,
      designSystemUrl: 'https://example.com/design-system',
      matomo: {
        ...DEFAULT_SERVER_CONFIG.matomo,
        url: 'https://stats.example.com/matomo',
      },
    });
    expect(directives['frame-ancestors']).toEqual([
      "'self'",
      'https://example.com',
    ]);
    expect(directives['script-src']).toContain('https://stats.example.com');
    expect(directives['connect-src']).toEqual([
      "'self'",
      'https://stats.example.com',
    ]);
  });
});
