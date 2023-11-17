import { APP_INITIALIZER, Provider } from '@angular/core';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { HighlightedCodeDarkModeHandler } from './services/highlighted-code-dark-mode-handler.service';

export const HighlightJsThemes = {
  light: 'assets/highlightjs/styles/github.css',
  dark: 'assets/highlightjs/styles/github-dark.css',
};

export const provideHighlightedCode = (): Provider[] => [
  {
    provide: HIGHLIGHT_OPTIONS,
    useValue: {
      coreLibraryLoader: () => import('highlight.js/lib/core'),
      languages: {
        javascript: () => import('highlight.js/lib/languages/javascript'),
      },
      themePath: HighlightJsThemes.light,
    },
  },
  {
    provide: APP_INITIALIZER,
    multi: true,
    deps: [HighlightedCodeDarkModeHandler],
    useFactory: (handler: HighlightedCodeDarkModeHandler) => () =>
      handler.autoSwitchDarkMode(),
  },
];
