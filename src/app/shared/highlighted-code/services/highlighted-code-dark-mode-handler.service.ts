import { effect, EnvironmentInjector, inject, Injectable } from '@angular/core';
import { HighlightLoader } from 'ngx-highlightjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { HighlightJsThemes } from '../provide-highlighted-code';
import { DarkModeService } from '../../dark-mode/dark-mode.service';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';

/**
 * Service for handling the automatic switching of dark and light themes for highlighted code.
 * This service listens to changes in the preferred color scheme and adjusts the code highlighting theme accordingly.
 */
@Injectable({ providedIn: 'root' })
export class HighlightedCodeDarkModeHandler {
  private readonly isDarkMode$ = inject(DarkModeService).$isDarkMode;

  private readonly hljsLoader = inject(HighlightLoader);

  private readonly injector = inject(EnvironmentInjector);

  autoSwitchDarkMode(): void {
    const $ready = toSignal(fromPromise(this.hljsLoader.ready), { injector: this.injector });
    effect(
      () => {
        const ready = $ready();
        if (ready == null) {
          return;
        }

        const theme = this.isDarkMode$()
          ? HighlightJsThemes.dark
          : HighlightJsThemes.light;
        this.hljsLoader.setTheme(theme);
      },
      {
        injector: this.injector,
      },
    );
  }
}
