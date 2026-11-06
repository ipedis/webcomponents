import { REQUEST_CONTEXT, TransferState, makeStateKey } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DEFAULT_APP_CONFIG, PublicAppConfig } from './app-config';
import {
  APP_CONFIG,
  provideAppConfig,
  provideServerAppConfig,
} from './app-config.providers';

const STATE_KEY = makeStateKey<PublicAppConfig>('appConfig');

const STAGING_CONFIG: PublicAppConfig = {
  designSystemUrl: 'https://staging-design.example.com',
  matomo: { enabled: false, url: 'https://matomo.example.com', siteId: '12' },
};

describe('provideServerAppConfig', () => {
  it('takes the configuration from the request context', () => {
    TestBed.configureTestingModule({
      providers: [
        provideServerAppConfig(),
        { provide: REQUEST_CONTEXT, useValue: { appConfig: STAGING_CONFIG } },
      ],
    });
    expect(TestBed.inject(APP_CONFIG)).toEqual(STAGING_CONFIG);
  });

  it('writes the configuration into the transfer state', () => {
    TestBed.configureTestingModule({
      providers: [
        provideServerAppConfig(),
        { provide: REQUEST_CONTEXT, useValue: { appConfig: STAGING_CONFIG } },
      ],
    });
    expect(TestBed.inject(TransferState).get(STATE_KEY, null)).toEqual(
      STAGING_CONFIG,
    );
  });

  it('falls back to the defaults without a request context', () => {
    TestBed.configureTestingModule({ providers: [provideServerAppConfig()] });
    expect(TestBed.inject(APP_CONFIG)).toEqual(DEFAULT_APP_CONFIG);
  });
});

describe('provideAppConfig', () => {
  it('reads the configuration written by the server', () => {
    TestBed.configureTestingModule({ providers: [provideAppConfig()] });
    TestBed.inject(TransferState).set(STATE_KEY, STAGING_CONFIG);
    expect(TestBed.inject(APP_CONFIG)).toEqual(STAGING_CONFIG);
  });

  it('falls back to the defaults when the page has no state', () => {
    TestBed.configureTestingModule({ providers: [provideAppConfig()] });
    expect(TestBed.inject(APP_CONFIG)).toEqual(DEFAULT_APP_CONFIG);
  });
});
