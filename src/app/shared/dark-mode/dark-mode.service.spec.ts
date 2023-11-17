import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { DarkModeService } from './dark-mode.service';

describe('DarkModeService', () => {
  let spectator: SpectatorService<DarkModeService>;

  const createService = createServiceFactory(DarkModeService);

  beforeEach(() => {
    let onChange: (event: MediaQueryListEvent) => void;
    const windowMatchMediaMock: PropertyDescriptor = {
      writable: true,
      value: jest.fn().mockImplementation(
        (query) =>
          ({
            matches: false,
            media: query,
            addEventListener: jest.fn().mockImplementation(function (
              this: MediaQueryList,
              type,
              callback,
            ) {
              onChange = callback;
            }),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn().mockImplementation(function (
              this: MediaQueryList,
              event,
            ) {
              if (onChange != null) {
                onChange(event);
              }
            }),
          }) as Partial<MediaQueryList>,
      ),
    };

    Object.defineProperty(window, 'matchMedia', windowMatchMediaMock);

    spectator = createService();
  });

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });

  describe('$isDarkMode', () => {
    it('should return false by default', () => {
      expect(spectator.service.$isDarkMode()).toBeFalse();
    });

    it('should return true when the media query matches', () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .dispatchEvent({ matches: true } as MediaQueryListEvent);
      expect(spectator.service.$isDarkMode()).toBeTrue();
    });

    it('should return false when the media query does not match', () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .dispatchEvent({ matches: false } as MediaQueryListEvent);
      expect(spectator.service.$isDarkMode()).toBeFalse();
    });
  });
});
