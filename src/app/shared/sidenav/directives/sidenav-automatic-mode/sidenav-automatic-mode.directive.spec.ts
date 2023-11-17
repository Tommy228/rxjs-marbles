import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';
import {
  Event as RouterEvent,
  NavigationEnd,
  NavigationError,
  Router,
} from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { Subject } from 'rxjs';
import { SidenavAutomaticModeDirective } from './sidenav-automatic-mode.directive';
import { SidenavBreakpointHandlerService } from '../../services/sidenav-breakpoint-handler/sidenav-breakpoint-handler.service';
import { mockProvider } from '@ngneat/spectator/jest';
import { signal, WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

describe('SidenavAutomaticModeDirective', () => {
  let spectator: SpectatorDirective<SidenavAutomaticModeDirective>;
  let routerEvents: Subject<RouterEvent>;
  let $sidenavPermanent: WritableSignal<boolean>;
  let matSideNav: MatSidenav;

  const createDirective = createDirectiveFactory({
    directive: SidenavAutomaticModeDirective,
    imports: [MatSidenavModule],
  });

  beforeEach(() => {
    routerEvents = new Subject<RouterEvent>();
    $sidenavPermanent = signal(false);
    spectator = createDirective(`<mat-sidenav appSidenavAutomaticMode />`, {
      providers: [
        mockProvider(Router, { events: routerEvents.asObservable() }),
        mockProvider(SidenavBreakpointHandlerService, {
          $permanent: $sidenavPermanent,
        }),
      ],
    });
    matSideNav = spectator.query(MatSidenav)!;
  });

  it('should create', () => {
    expect(spectator.directive).toBeTruthy();
  });

  it('should set the sidenav to permanent mode when the breakpoint is permanent', () => {
    $sidenavPermanent.set(true);
    spectator.detectChanges();
    expect(matSideNav.mode).toBe('side');
  });

  it('should set the sidenav to over mode when the breakpoint is not permanent', () => {
    $sidenavPermanent.set(false);
    spectator.detectChanges();
    expect(matSideNav.mode).toBe('over');
  });

  it('should close the sidenav when the router navigates and the sidenav is in over mode', () => {
    matSideNav.open();
    routerEvents.next(new NavigationEnd(1, '', ''));
    TestBed.flushEffects();
    expect(matSideNav.opened).toBeFalse();
  });

  it('should not close the sidenav when the router does not navigate', () => {
    matSideNav.open();
    routerEvents.next(new NavigationError(1, '', new Error()));
    TestBed.flushEffects();
    expect(matSideNav.opened).toBeTrue();
  });
});
