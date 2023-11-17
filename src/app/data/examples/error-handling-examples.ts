import { createExample } from '../example';
import { catchError, of } from 'rxjs';

const _catchError = createExample<[number], number>({
  name: 'catchError',
  description: 'Gracefully handle errors in an observable sequence.',
  linkToDocumentation:
    'https://www.learnrxjs.io/learn-rxjs/operators/error_handling/catch',
  label: `catchError(() => of(0))`,
  inputs: [
    [
      { t: 10, x: 10 },
      { t: 20, x: 20 },
      { t: 30, x: 30 },
      { t: 40, e: true },
    ],
  ],
  apply: ([x$]) => x$.pipe(catchError(() => of(0))),
});

export const errorHandlingExamples = [_catchError];
