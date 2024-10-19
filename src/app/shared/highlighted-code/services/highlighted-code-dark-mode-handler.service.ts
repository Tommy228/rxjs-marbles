import { effect, inject, Injectable, Injector, Signal, untracked } from '@angular/core';
import { HighlightLoader } from 'ngx-highlightjs';
import { HighlightJsThemes } from '../provide-highlighted-code';
import { DarkModeService } from '../../dark-mode/dark-mode.service';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { map } from 'rxjs/operators';
import { toLazySignal } from 'ngxtension/to-lazy-signal';

/**
 * Service for handling the automatic switching of dark and light themes for highlighted code.
 * This service listens to changes in the preferred color scheme and adjusts the code highlighting theme accordingly.
 */
@Injectable({ providedIn: 'root' })
export class HighlightedCodeDarkModeHandler {
  private readonly isDarkMode = inject(DarkModeService).$isDarkMode;

  private readonly hljsLoader = inject(HighlightLoader);

  private readonly injector = inject(Injector);

  private readonly ready: Signal<boolean | undefined> = toLazySignal(
    fromPromise(this.hljsLoader.ready).pipe(map(() => true)),
    { initialValue: false }
  );

  autoSwitchDarkMode(): void {
    effect(
      () => {
        const ready = this.ready();
        if (!ready) {
          return;
        }
        const theme = this.isDarkMode()
          ? HighlightJsThemes.dark
          : HighlightJsThemes.light;
        untracked(() => this.hljsLoader.setTheme(theme));
      },
      { injector: this.injector }
    );
  }
}
