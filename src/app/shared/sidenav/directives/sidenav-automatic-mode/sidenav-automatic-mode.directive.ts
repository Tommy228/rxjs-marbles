import { Directive, effect, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { toSignal } from '@angular/core/rxjs-interop';
import { SidenavBreakpointHandlerService } from '../../services/sidenav-breakpoint-handler/sidenav-breakpoint-handler.service';

@Directive({
  selector: '[appSidenavAutomaticMode]',
  standalone: true,
})
export class SidenavAutomaticModeDirective {
  private readonly $routerEvents = toSignal(inject(Router).events);

  private readonly $isSidenavPermanent = inject(SidenavBreakpointHandlerService)
    .$permanent;

  private readonly sidenav = inject(MatSidenav);

  constructor() {
    effect(() => this.setSidenavPermanentOnResize());
    effect(() => this.closeSidenavOnNavigation());
  }

  private setSidenavPermanentOnResize(): void {
    const permanent = this.$isSidenavPermanent();
    this.sidenav.mode = permanent ? 'side' : 'over';
  }

  private closeSidenavOnNavigation(): void {
    const event = this.$routerEvents();
    if (event instanceof NavigationEnd && this.sidenav.mode === 'over') {
      // noinspection JSIgnoredPromiseFromCall -- no need to await
      this.sidenav.close();
    }
  }
}
