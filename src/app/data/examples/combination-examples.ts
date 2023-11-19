import {
  combineLatest,
  concat,
  forkJoin,
  map,
  merge,
  race,
  startWith,
  withLatestFrom,
  zip,
} from 'rxjs';
import { createExample } from '../example';

const _combineLatest = createExample<[string, string], string>({
  name: 'combineLatest',
  label: `combineLatest([x$, y$]).pipe(
  map((x, y) => x + y)
)`,
  description:
    'When any observable emits a value, emit the last emitted value from each.',
  linkToDocumentation:
    'https://www.learnrxjs.io/learn-rxjs/operators/combination/combinelatest',
  inputs: [
    [
      { t: 0, x: '1' },
      { t: 20, x: '2' },
      { t: 65, x: '3' },
      { t: 75, x: '4' },
      { t: 92, x: '5' },
    ],
    [
      { t: 10, x: 'A' },
      { t: 25, x: 'B' },
      { t: 50, x: 'C' },
      { t: 57, x: 'D' },
    ],
  ],
  apply: ([x$, y$]) => combineLatest([x$, y$], (x, y) => x + y),
});

const _concat = createExample<[number, number], number>({
  name: 'concat',
  label: 'concat(x$, y$)',
  description: 'Subscribe to observables in order as previous completes',
  linkToDocumentation:
    'https://www.learnrxjs.io/learn-rxjs/operators/combination/concat',
  inputs: [
    [
      { t: 0, x: 1 },
      { t: 15, x: 1 },
      { t: 50, x: 1 },
      { t: 57, c: true },
    ],
    [
      { t: 0, x: 2 },
      { t: 8, x: 2 },
      { t: 12, c: true },
    ],
  ],
  apply: ([x$, y$]) => concat(x$, y$),
});

const _forkJoin = createExample<[string, number], string>({
  name: 'forkJoin',
  label: `forkJoin(x$, y$).pipe(
  map((x, y) => x + y)
)`,
  description:
    'When all observables complete, emit the last emitted value from each.',
  linkToDocumentation:
    'https://www.learnrxjs.io/learn-rxjs/operators/combination/forkjoin',
  inputs: [
    [
      { t: 0, x: 'A' },
      { t: 15, x: 'B' },
      { t: 50, x: 'C' },
      { t: 57, c: true },
    ],
    [
      { t: 0, x: 1 },
      { t: 8, x: 2 },
      { t: 12, c: true },
    ],
  ],
  apply: ([x$, y$]) => forkJoin([x$, y$]).pipe(map(([x, y]) => x + y)),
});

const _merge = createExample<[number, number], number>({
  name: 'merge',
  label: 'merge(x$, y$)',
  description: 'Turn multiple observables into a single observable.',
  linkToDocumentation:
    'https://www.learnrxjs.io/learn-rxjs/operators/combination/merge',
  inputs: [
    [
      { t: 0, x: 20 },
      { t: 15, x: 40 },
      { t: 30, x: 60 },
      { t: 45, x: 80 },
      { t: 60, x: 100 },
    ],
    [
      { t: 37, x: 1 },
      { t: 68, x: 1 },
    ],
  ],
  apply: ([x$, y$]) => merge(x$, y$),
});

const _race = createExample<[number, number, number], number>({
  name: 'race',
  label: 'race(x$, y$, z$)',
  description: 'The observable to emit first is used.',
  linkToDocumentation:
    'https://www.learnrxjs.io/learn-rxjs/operators/combination/race',
  inputs: [
    [
      { t: 10, x: 20 },
      { t: 20, x: 40 },
      { t: 30, x: 60 },
    ],
    [
      { t: 5, x: 1 },
      { t: 15, x: 2 },
      { t: 25, x: 3 },
    ],
    [
      { t: 20, x: 0 },
      { t: 32, x: 0 },
      { t: 44, x: 0 },
    ],
  ],
  apply: ([x$, y$, z$]) => race(x$, y$, z$),
});

const _startWith = createExample<[number], number>({
  name: 'startWith',
  label: 'x$.pipe(startWith(1))',
  description: 'Emit given value first.',
  linkToDocumentation:
    'https://www.learnrxjs.io/learn-rxjs/operators/combination/startwith',
  inputs: [
    [
      { t: 30, x: 2 },
      { t: 40, x: 3 },
    ],
  ],
  apply: ([x$]) => x$.pipe(startWith(1)),
});

const _withLatestFrom = createExample<[string, string], string>({
  name: 'withLatestFrom',
  label: `x$.pipe(
  withLatestFrom(y$), 
  map((x, y) => x + y)
)`,
  description: 'Also provide the last value from another observable.',
  linkToDocumentation:
    'https://www.learnrxjs.io/learn-rxjs/operators/combination/withlatestfrom',
  inputs: [
    [
      { t: 0, x: '1' },
      { t: 20, x: '2' },
      { t: 65, x: '3' },
      { t: 75, x: '4' },
      { t: 92, x: '5' },
    ],
    [
      { t: 10, x: 'A' },
      { t: 25, x: 'B' },
      { t: 50, x: 'C' },
      { t: 57, x: 'D' },
    ],
  ],
  apply: ([x$, y$]) =>
    x$.pipe(
      withLatestFrom(y$),
      map(([x, y]) => x + y),
    ),
});

const _zip = createExample<[string, string], string>({
  name: 'zip',
  label: 'zip(x$, y$)',
  description: 'After all observables emit, emit values as an array.',
  linkToDocumentation:
    'https://www.learnrxjs.io/learn-rxjs/operators/combination/zip',
  inputs: [
    [
      { t: 0, x: '1' },
      { t: 20, x: '2' },
      { t: 65, x: '3' },
      { t: 75, x: '4' },
      { t: 92, x: '5' },
    ],
    [
      { t: 10, x: 'A' },
      { t: 25, x: 'B' },
      { t: 50, x: 'C' },
      { t: 57, x: 'D' },
    ],
  ],
  apply: ([x$, y$]) => zip(x$, y$, (x, y) => x + y),
});

export const combinationExamples = [
  _combineLatest,
  _concat,
  _forkJoin,
  _merge,
  _race,
  _startWith,
  _withLatestFrom,
  _zip,
];
