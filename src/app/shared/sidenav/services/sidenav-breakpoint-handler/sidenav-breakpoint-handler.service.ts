import { inject, Injectable, Signal } from '@angular/core';
import { map } from 'rxjs/operators';
import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class SidenavBreakpointHandlerService {
  static readonly SIDENAV_PERMANENT_AT = 960;

  private readonly breakpointObserver = inject(BreakpointObserver);

  readonly $permanent: Signal<boolean> = toSignal(
    this.breakpointObserver
      .observe(
        `(min-width: ${SidenavBreakpointHandlerService.SIDENAV_PERMANENT_AT}px)`,
      )
      .pipe(map(({ matches }) => matches)),
    { initialValue: true },
  );
}
