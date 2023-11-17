import {
  createServiceFactory,
  mockProvider,
  SpectatorService,
} from '@ngneat/spectator/jest';
import { SidenavBreakpointHandlerService } from './sidenav-breakpoint-handler.service';
import { Subject } from 'rxjs';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

describe('SidenavBreakpointHandlerService', () => {
  let spectator: SpectatorService<SidenavBreakpointHandlerService>;

  let breakpointState: Subject<BreakpointState>;

  const createService = createServiceFactory({
    service: SidenavBreakpointHandlerService,
  });

  beforeEach(() => {
    breakpointState = new Subject<BreakpointState>();
    spectator = createService({
      providers: [
        mockProvider(BreakpointObserver, {
          observe: jest
            .fn()
            .mockImplementationOnce(() => breakpointState.asObservable()),
        }),
      ],
    });
  });

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });

  describe('$permanent', () => {
    it('should observe the breakpoint', () => {
      expect(
        spectator.inject(BreakpointObserver).observe,
      ).toHaveBeenCalledExactlyOnceWith('(min-width: 960px)');
    });

    it('should return true by default', () => {
      expect(spectator.service.$permanent()).toBeTrue();
    });

    it('should return false when the breakpoint is not matched', () => {
      breakpointState.next({ matches: false } as BreakpointState);
      expect(spectator.service.$permanent()).toBeFalse();
    });

    it('should return true when the breakpoint is matched', () => {
      breakpointState.next({ matches: true } as BreakpointState);
      expect(spectator.service.$permanent()).toBeTrue();
    });
  });
});
