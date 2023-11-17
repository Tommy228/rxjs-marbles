import { createExample } from '../example';
import { defaultIfEmpty, every, sequenceEqual } from 'rxjs';

const _defaultIfEmpty = createExample<[never], number>({
  name: 'defaultIfEmpty',
  description: 'Emit given value if nothing is emitted before completion.',
  linkToDocumentation:
    'https://www.learnrxjs.io/learn-rxjs/operators/conditional/defaultifempty',
  label: `defaultIfEmpty(1)`,
  inputs: [[{ t: 50, c: true }]],
  apply: ([x$]) => x$.pipe(defaultIfEmpty(1)),
});

const _every = createExample<[number], boolean>({
  name: 'every',
  description:
    'If all values pass predicate before completion emit true, else false.',
  linkToDocumentation: '',
  label: `every(x => x > 0)`,
  inputs: [
    [
      { t: 0, x: 1 },
      { t: 10, x: 2 },
      { t: 30, c: true },
      { t: 40, x: -1 },
    ],
  ],
  apply: ([x$]) => x$.pipe(every((x) => x > 0)),
});

const _sequenceEqual = createExample<[number, number], boolean>({
  name: 'sequenceEqual',
  description: 'Compares emitted sequence to expected sequence for match.',
  label: `x$.pipe(sequenceEqual(y$))`,
  linkToDocumentation:
    'https://www.learnrxjs.io/learn-rxjs/operators/conditional/sequenceequal',
  inputs: [
    [
      { t: 5, x: 1 },
      { t: 15, x: 2 },
      { t: 25, x: 3 },
      { t: 35, x: 4 },
      { t: 65, x: 5 },
      { t: 85, c: true },
    ],
    [
      { t: 2, x: 1 },
      { t: 20, x: 2 },
      { t: 40, x: 3 },
      { t: 70, x: 4 },
      { t: 77, x: 5 },
      { t: 85, c: true },
    ],
  ],
  apply: ([x$, y$]) => x$.pipe(sequenceEqual(y$)),
});

export const conditionalExamples = [_defaultIfEmpty, _every, _sequenceEqual];
