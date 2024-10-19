import { HighlightedCodeDarkModeHandler } from './highlighted-code-dark-mode-handler.service';
import {
  createServiceFactory,
  mockProvider,
  SpectatorService,
  SpyObject,
} from '@ngneat/spectator/jest';
import { HighlightLoader } from 'ngx-highlightjs';
import { of } from 'rxjs';
import { signal, WritableSignal } from '@angular/core';
import { DarkModeService } from '../../dark-mode/dark-mode.service';
import { TestBed } from '@angular/core/testing';

describe('HighlightedCodeDarkModeHandler', () => {
  let spectator: SpectatorService<HighlightedCodeDarkModeHandler>;

  let hljsLoader: SpyObject<HighlightLoader>;
  let $isDarkMode: WritableSignal<boolean>;

  const createService = createServiceFactory({
    service: HighlightedCodeDarkModeHandler,
    mocks: [HighlightLoader],
  });

  beforeEach(() => {
    $isDarkMode = signal(false);
    spectator = createService({
      providers: [mockProvider(DarkModeService, { $isDarkMode })],
    });
    hljsLoader = spectator.inject(HighlightLoader);
  });

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });

  describe('autoSwitchDarkMode', () => {
    it('should set dark theme when dark mode is enabled', () => {
      const ready = Promise.resolve({})
      Object.assign(hljsLoader, { ready });
      $isDarkMode.set(true);
      spectator.service.autoSwitchDarkMode();
      TestBed.flushEffects();
      expect(hljsLoader.setTheme).toHaveBeenCalledExactlyOnceWith(
        'highlightjs/styles/github-dark.css',
      );
    });

    it('should set light theme when dark mode is disabled', () => {
      const ready = Promise.resolve({})
      Object.assign(hljsLoader, { ready });
      $isDarkMode.set(false);
      spectator.service.autoSwitchDarkMode();
      TestBed.flushEffects();
      expect(hljsLoader.setTheme).toHaveBeenCalledExactlyOnceWith(
        'highlightjs/styles/github.css',
      );
    });

    it('should not set theme when library is not ready', () => {
      const ready = of(undefined);
      Object.assign(hljsLoader, { ready });
      $isDarkMode.set(true);
      spectator.service.autoSwitchDarkMode();
      TestBed.flushEffects();
      expect(hljsLoader.setTheme).not.toHaveBeenCalled();
    });
  });
});
