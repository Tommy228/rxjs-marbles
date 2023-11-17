import { computed, Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class DarkModeService {
  private readonly windowMatchMedia = window.matchMedia(
    '(prefers-color-scheme: dark)',
  );

  private readonly $windowsMatchMediaResult = toSignal(
    fromEvent<MediaQueryList>(this.windowMatchMedia, 'change'),
    { initialValue: this.windowMatchMedia },
  );

  readonly $isDarkMode = computed(
    () => this.$windowsMatchMediaResult().matches,
  );
}
