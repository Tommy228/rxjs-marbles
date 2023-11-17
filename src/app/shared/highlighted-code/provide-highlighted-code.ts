import { APP_INITIALIZER, Provider } from '@angular/core';
import { provideHighlightOptions } from 'ngx-highlightjs';
import { HighlightedCodeDarkModeHandler } from './services/highlighted-code-dark-mode-handler.service';

export const HighlightJsThemes = {
  light: 'highlightjs/styles/github.css',
  dark: 'highlightjs/styles/github-dark.css',
};

export const provideHighlightedCode = (): Provider[] => [
  provideHighlightOptions({
    coreLibraryLoader: () => import('highlight.js/lib/core'),
    languages: {
      javascript: () => import('highlight.js/lib/languages/javascript'),
    },
    themePath: HighlightJsThemes.light,
  }),
  {
    provide: APP_INITIALIZER,
    multi: true,
    deps: [HighlightedCodeDarkModeHandler],
    useFactory: (handler: HighlightedCodeDarkModeHandler) => () =>
      handler.autoSwitchDarkMode(),
  },
];
