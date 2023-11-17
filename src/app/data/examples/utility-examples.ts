import { createExample } from '../example';
import { repeat } from 'rxjs';

const _repeat = createExample<[string], string>({
  name: 'repeat',
  label: 'repeat(3)',
  description: 'Repeats the source observable a specified number of times.',
  linkToDocumentation:
    'https://www.learnrxjs.io/learn-rxjs/operators/utility/repeat',
  inputs: [
    [
      { t: 0, x: 'A' },
      { t: 12, x: 'B' },
      { t: 25, c: true },
    ],
  ],
  apply: ([x$]) => x$.pipe(repeat(3)),
});

export const utilityExamples = [_repeat];
