import { createExample, ExampleFactory } from '../example';
import {
  buffer,
  bufferCount,
  bufferTime,
  bufferToggle,
  bufferWhen,
  concatMap,
  exhaustMap,
  map,
  mergeMap,
  pairwise,
  scan,
  switchMap,
  timer,
} from 'rxjs';

const _buffer = createExample<[string, number], string>({
  name: 'buffer',
  label: 'x$.pipe(buffer(y$))',
  description:
    'Collect output values until provided observable emits, emit as array.',
  linkToDocumentation:
    'https://www.learnrxjs.io/learn-rxjs/operators/transformation/mergemap',
  inputs: [
    [
      { t: 9, x: 'A' },
      { t: 23, x: 'B' },
      { t: 40, x: 'C' },
      { t: 54, x: 'D' },
      { t: 71, x: 'E' },
      { t: 85, x: 'F' },
    ],
    [
      { t: 33, x: 0 },
      { t: 66, x: 0 },
      { t: 90, x: 0 },
    ],
  ],
  apply: ([x$, y$]) =>
    x$.pipe(
      buffer(y$),
      map((x) => `[${x.join(', ')}]`),
    ),
});

const _bufferCount = createExample<[string], string>({
  name: 'bufferCount',
  label: 'bufferCount(3, 2)',
  description:
    'Collect emitted values until provided number is fulfilled, emit as array.',
  linkToDocumentation:
    'https://www.learnrxjs.io/learn-rxjs/operators/transformation/buffercount',
  inputs: [
    [
      { t: 9, x: 'A' },
      { t: 23, x: 'B' },
      { t: 40, x: 'C' },
      { t: 54, x: 'D' },
      { t: 71, x: 'E' },
      { t: 85, x: 'F' },
    ],
  ],
  apply: ([x$]) =>
    x$.pipe(
      bufferCount(3, 2),
      map((x) => `[${x.join(', ')}]`),
    ),
});

const _bufferTime = createExample<[string], string>({
  name: 'bufferTime',
  label: 'bufferTime(30)',
  description: 'Collect and emit values into an array over time intervals.',
  linkToDocumentation:
    'https://www.learnrxjs.io/learn-rxjs/operators/transformation/buffertime',
  inputs: [
    [
      { t: 0, x: 'A' },
      { t: 10, x: 'B' },
      { t: 22, x: 'C' },
      { t: 61, x: 'D' },
      { t: 71, x: 'E' },
      { t: 95, x: 'F' },
    ],
  ],
  apply: ([x$], scheduler) =>
    x$.pipe(
      bufferTime(30, scheduler),
      map((x) => `[${x.join(', ')}]`),
    ),
});

const _bufferToggle = createExample<[number, number], string>({
  name: 'bufferToggle',
  label: `x$.pipe(
  bufferToggle(y$, x => timer(x))
)`,
  description:
    'Collect and emit values into an array based on opening and closing observables.',
  linkToDocumentation:
    'https://www.learnrxjs.io/learn-rxjs/operators/transformation/buffertoggle',
  inputs: [
    [
      { t: 0, x: 1 },
      { t: 10, x: 2 },
      { t: 20, x: 3 },
      { t: 30, x: 4 },
      { t: 40, x: 5 },
      { t: 50, x: 6 },
      { t: 60, x: 7 },
      { t: 70, x: 8 },
      { t: 80, x: 9 },
    ],
    [
      { t: 15, x: 10 },
      { t: 45, x: 30 },
    ],
  ],
  apply: ([x$, y$], scheduler) =>
    x$.pipe(
      bufferToggle(y$, (x) => timer(x, scheduler)),
      map((x) => `[${x.join(', ')}]`),
    ),
});

const _bufferWhen = createExample<[number, number], string>({
  name: 'bufferWhen',
  label: `x$.pipe(
  bufferWhen(() => y$)
)`,
  description:
    'Collect and emit values into an array based on a signal from an observable.',
  linkToDocumentation:
    'https://www.learnrxjs.io/learn-rxjs/operators/transformation/bufferwhen',
  inputs: [
    [
      { t: 0, x: 1 },
      { t: 10, x: 2 },
      { t: 20, x: 3 },
      { t: 30, x: 4 },
      { t: 40, x: 5 },
      { t: 50, x: 6 },
      { t: 60, x: 7 },
      { t: 70, x: 8 },
      { t: 80, x: 9 },
    ],
    [
      { t: 35, x: 0 },
      { t: 50, x: 0 },
    ],
  ],
  apply: ([x$, y$]) =>
    x$.pipe(
      bufferWhen(() => y$),
      map((x) => `[${x.join(', ')}]`),
    ),
});

const _concatMap = createExample<[string, number], string>({
  name: 'concatMap',
  label: `x$.pipe(
  concatMap(x => 
    y$.pipe(
      map(y => x + y)
    )
  )
)`,
  description: 'Map to observable, emit values in order.',
  linkToDocumentation:
    'https://www.learnrxjs.io/learn-rxjs/operators/transformation/concatmap',
  inputs: [
    [
      { t: 0, x: 'A' },
      { t: 42, x: 'B' },
      { t: 55, x: 'C' },
    ],
    [
      { t: 0, x: 1 },
      { t: 10, x: 2 },
      { t: 20, x: 3 },
      { t: 25, c: true },
    ],
  ],
  apply: ([x$, y$]) => x$.pipe(concatMap((x) => y$.pipe(map((y) => x + y)))),
});

const _exhaustMap = createExample<[string, number], string>({
  name: 'exhaustMap',
  label: `x$.pipe(
  exhaustMap(x => 
    y$.pipe(
      map(y => x + y)
    )
  )
)`,
  description:
    'Projects each source value to an Observable which is merged in the output Observable only if the previous projected Observable has completed.',
  linkToDocumentation: 'https://rxjs.dev/api/operators/exhaustMap',
  inputs: [
    [
      { t: 0, x: 'A' },
      { t: 42, x: 'B' },
      { t: 55, x: 'C' },
    ],
    [
      { t: 0, x: 1 },
      { t: 10, x: 2 },
      { t: 20, x: 3 },
      { t: 25, c: true },
    ],
  ],
  apply: ([x$, y$]) => x$.pipe(exhaustMap((x) => y$.pipe(map((y) => x + y)))),
});

const _mergeMap = createExample<[string, number], string>({
  name: 'mergeMap',
  label: `x$.pipe(
  mergeMap(x => 
    y$.pipe(
      map(y => x + y)
    )
  )
)`,
  description: 'Map to observable, emit values.',
  linkToDocumentation:
    'https://www.learnrxjs.io/learn-rxjs/operators/transformation/mergemap',
  inputs: [
    [
      { t: 0, x: 'A' },
      { t: 30, x: 'B' },
      { t: 60, x: 'C' },
    ],
    [
      { t: 0, x: 1 },
      { t: 12, x: 2 },
      { t: 24, x: 3 },
      { t: 28, c: true },
    ],
  ],
  apply: ([x$, y$]) => x$.pipe(mergeMap((x) => y$.pipe(map((y) => x + y)), 2)),
});

const _map = createExample<[number], number>({
  name: 'map',
  label: 'map(x => x * 2)',
  description: 'Apply projection with each value from source.',
  linkToDocumentation:
    'https://www.learnrxjs.io/learn-rxjs/operators/transformation/map',
  inputs: [
    [
      { t: 0, x: 1 },
      { t: 10, x: 2 },
      { t: 20, x: 3 },
    ],
  ],
  apply: ([x$]) => x$.pipe(map((x) => x * 2)),
});

const _pairwise = createExample<[string], string>({
  name: 'pairwise',
  label: 'pairwise()',
  description: 'Pair consecutive values emitted by the source.',
  linkToDocumentation:
    'https://www.learnrxjs.io/learn-rxjs/operators/transformation/pairwise',
  inputs: [
    [
      { t: 9, x: 'A' },
      { t: 23, x: 'B' },
      { t: 40, x: 'C' },
      { t: 54, x: 'D' },
      { t: 71, x: 'E' },
      { t: 85, x: 'F' },
    ],
  ],
  apply: ([x$]) =>
    x$.pipe(
      pairwise(),
      map(([x, y]) => `[${x}, ${y}]`),
    ),
});

const _scan = createExample<[number], number>({
  name: 'scan',
  label: 'scan((x, y) => x + y)',
  description:
    'Apply an accumulator function over the source observable, emitting each intermediate result.',
  linkToDocumentation:
    'https://www.learnrxjs.io/learn-rxjs/operators/transformation/scan',
  inputs: [
    [
      { t: 5, x: 1 },
      { t: 15, x: 2 },
      { t: 25, x: 3 },
      { t: 35, x: 4 },
      { t: 65, x: 5 },
    ],
  ],
  apply: ([x$]) => x$.pipe(scan((x, y) => x + y)),
});

const _switchMap = createExample<[string, number], string>({
  name: 'switchMap',
  label: `x$.pipe(
  switchMap(x => 
    y$.pipe(
      map(y => x + y)
    )
  )
)`,
  description:
    'Map to observable, complete previous inner observable, emit values.',
  linkToDocumentation:
    'https://www.learnrxjs.io/learn-rxjs/operators/transformation/switchmap',
  inputs: [
    [
      { t: 0, x: 'A' },
      { t: 42, x: 'B' },
      { t: 55, x: 'C' },
    ],
    [
      { t: 0, x: 1 },
      { t: 10, x: 2 },
      { t: 20, x: 3 },
      { t: 25, c: true },
    ],
  ],
  apply: ([x$, y$]) => x$.pipe(switchMap((x) => y$.pipe(map((y) => x + y)))),
});

export const transformationExamples: ExampleFactory[] = [
  _buffer,
  _bufferCount,
  _bufferTime,
  _bufferToggle,
  _bufferWhen,
  _concatMap,
  _exhaustMap,
  _mergeMap,
  _map,
  _pairwise,
  _scan,
  _switchMap,
];
