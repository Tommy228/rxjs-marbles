import {
  debounce,
  debounceTime,
  distinct,
  distinctUntilChanged,
  filter,
  find,
  findIndex,
  first,
  ignoreElements,
  last,
  sample,
  skip,
  skipUntil,
  skipWhile,
  take,
  takeLast,
  takeUntil,
  takeWhile,
  throttle,
  throttleTime,
  timer,
} from 'rxjs';
import { createExample, ExampleFactory } from '../example';

const _debounce = createExample<[number], number>({
  name: 'debounce',
  label: `debounce(x => timer(10 * x))`,
  description:
    'Discard emitted values that take less than the specified time, based on selector function, between output.',
  linkToDocumentation:
    'https://www.learnrxjs.io/learn-rxjs/operators/filtering/debounce',
  inputs: [
    [
      { t: 0, x: 1 },
      { t: 26, x: 2 },
      { t: 34, x: 1 },
      { t: 40, x: 1 },
      { t: 45, x: 2 },
      { t: 79, x: 1 },
    ],
  ],
  apply: ([x$], scheduler) =>
    x$.pipe(debounce((x) => timer(x * 10, scheduler))),
});

const _debounceTime = createExample<[number], number>({
  name: 'debounceTime',
  description:
    'Discard emitted values that take less than the specified time between output.',
  linkToDocumentation:
    'https://www.learnrxjs.io/learn-rxjs/operators/filtering/debouncetime',
  label: 'debounceTime(10)',
  inputs: [
    [
      { t: 0, x: 1 },
      { t: 26, x: 2 },
      { t: 34, x: 3 },
      { t: 40, x: 4 },
      { t: 45, x: 5 },
      { t: 79, x: 6 },
    ],
  ],
  apply: ([x$], scheduler) => x$.pipe(debounceTime(10, scheduler)),
});

const _distinct = createExample<[number], number>({
  name: 'distinct',
  label: 'distinct()',
  description:
    'Emits items emitted that are distinct based on any previously emitted item.',
  linkToDocumentation:
    'https://www.learnrxjs.io/learn-rxjs/operators/filtering/distinct',
  inputs: [
    [
      { t: 5, x: 1 },
      { t: 20, x: 2 },
      { t: 35, x: 2 },
      { t: 60, x: 1 },
      { t: 70, x: 3 },
    ],
  ],
  apply: ([x$]) => x$.pipe(distinct()),
});

const _distinctUntilChanged = createExample<[number], number>({
  name: 'distinctUntilChanged',
  description: 'Only emit when the current value is different than the last.',
  linkToDocumentation:
    'https://www.learnrxjs.io/learn-rxjs/operators/filtering/distinctuntilchanged',
  label: 'distinctUntilChanged()',
  inputs: [
    [
      { t: 0, x: 1 },
      { t: 10, x: 1 },
      { t: 20, x: 2 },
      { t: 30, x: 2 },
      { t: 40, x: 3 },
    ],
  ],
  apply: ([x$]) => x$.pipe(distinctUntilChanged()),
});

const _filter = createExample<[number], number>({
  name: 'filter',
  label: 'filter(x => x % 2 === 0)',
  description: 'Emit values that pass the provided condition.',
  linkToDocumentation:
    'https://www.learnrxjs.io/learn-rxjs/operators/filtering/filter',
  inputs: [
    [
      { t: 10, x: 0 },
      { t: 20, x: 1 },
      { t: 40, x: 2 },
    ],
  ],
  apply: ([x$]) => x$.pipe(filter((value) => value % 2 === 0)),
});

const _find = createExample<[number], number | undefined>({
  name: 'find',
  label: 'find(x => x > 10)',
  description: 'Emit the first item that passes predicate then complete.',
  linkToDocumentation:
    'https://www.learnrxjs.io/learn-rxjs/operators/filtering/find',
  inputs: [
    [
      { t: 5, x: 2 },
      { t: 15, x: 30 },
      { t: 25, x: 22 },
      { t: 35, x: 5 },
      { t: 45, x: 60 },
      { t: 55, x: 1 },
    ],
  ],
  apply: ([x$]) => x$.pipe(find((x) => x > 10)),
});

const _findIndex = createExample<[number], number>({
  name: 'findIndex',
  label: 'findIndex(x => x > 10)',
  description:
    'Emits only the index of the first value emitted by the source Observable that meets some condition.',
  linkToDocumentation: 'https://rxjs.dev/api/operators/findIndex',
  inputs: [
    [
      { t: 5, x: 2 },
      { t: 15, x: 30 },
      { t: 25, x: 22 },
      { t: 35, x: 5 },
      { t: 45, x: 60 },
      { t: 55, x: 1 },
    ],
  ],
  apply: ([x$]) => x$.pipe(findIndex((x) => x > 10)),
});

const _first = createExample<[number], number>({
  name: 'first',
  label: 'first()',
  description: 'Emit the first value or first to pass provided expression.',
  linkToDocumentation:
    'https://www.learnrxjs.io/learn-rxjs/operators/filtering/first',
  inputs: [
    [
      { t: 30, x: 1 },
      { t: 40, x: 2 },
      { t: 65, x: 3 },
      { t: 75, x: 4 },
      { t: 85, c: true },
    ],
  ],
  apply: ([x$]) => x$.pipe(first()),
});

const _ignoreElements = createExample<[string], never>({
  name: 'ignoreElements',
  label: 'ignoreElements()',
  description: 'Ignore everything but complete and error.',
  linkToDocumentation:
    'https://www.learnrxjs.io/learn-rxjs/operators/filtering/ignoreelements',
  inputs: [
    [
      { t: 20, x: 'A' },
      { t: 40, x: 'B' },
      { t: 50, x: 'C' },
      { t: 75, x: 'D' },
      { t: 90, c: true },
    ],
  ],
  apply: ([x$]) => x$.pipe(ignoreElements()),
});

const _last = createExample<[number], number>({
  name: 'last',
  label: 'last()',
  description:
    'Emit the last value emitted from source on completion, based on provided expression.',
  linkToDocumentation:
    'https://www.learnrxjs.io/learn-rxjs/operators/filtering/last',
  inputs: [
    [
      { t: 30, x: 1 },
      { t: 40, x: 2 },
      { t: 65, x: 3 },
      { t: 75, x: 4 },
      { t: 85, c: true },
    ],
  ],
  apply: ([x$]) => x$.pipe(last()),
});

const _sample = createExample<[number, string], number>({
  name: 'sample',
  label: 'sample(y$)',
  description: 'Sample from source when provided observable emits',
  linkToDocumentation:
    'https://www.learnrxjs.io/learn-rxjs/operators/filtering/sample',
  inputs: [
    [
      { t: 0, x: 1 },
      { t: 20, x: 2 },
      { t: 40, x: 3 },
      { t: 60, x: 4 },
      { t: 80, x: 5 },
    ],
    [
      { t: 10, x: 'A' },
      { t: 25, x: 'B' },
      { t: 33, x: 'C' },
      { t: 70, x: 'D' },
      { t: 90, c: true },
    ],
  ],
  apply: ([x$, y$]) => x$.pipe(sample(y$)),
});

const _skip = createExample<[number], number>({
  name: 'skip',
  label: 'skip(2)',
  description: 'Skip the provided number of emitted values.',
  linkToDocumentation:
    'https://www.learnrxjs.io/learn-rxjs/operators/filtering/skip',
  inputs: [
    [
      { t: 30, x: 1 },
      { t: 40, x: 2 },
      { t: 65, x: 3 },
      { t: 75, x: 4 },
    ],
  ],
  apply: ([x$]) => x$.pipe(skip(2)),
});

const _skipUntil = createExample<[number, number], number>({
  name: 'skipUntil',
  label: 'x$.pipe(skipUntil(y$))',
  description:
    'Skip emitted values from source until provided observable emits.',
  linkToDocumentation:
    'https://www.learnrxjs.io/learn-rxjs/operators/filtering/skipuntil',
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
      { t: 45, x: 0 },
      { t: 73, x: 0 },
    ],
  ],
  apply: ([x$, y$]) => x$.pipe(skipUntil(y$)),
});

const _skipWhile = createExample<[number], number>({
  name: 'skipWhile',
  label: 'x$.pipe(skipWhile(x => x < 5))',
  description:
    'Skip emitted values from source until provided expression is false.',
  linkToDocumentation:
    'https://www.learnrxjs.io/learn-rxjs/operators/filtering/skipwhile',
  inputs: [
    [
      { t: 5, x: 1 },
      { t: 20, x: 3 },
      { t: 35, x: 6 },
      { t: 50, x: 4 },
      { t: 65, x: 7 },
      { t: 80, x: 2 },
    ],
  ],
  apply: ([x$]) => x$.pipe(skipWhile((x) => x < 5)),
});

const _take = createExample<[number], number>({
  name: 'take',
  label: 'take(2)',
  description: 'Emit provided number of values before completing.',
  linkToDocumentation:
    'https://www.learnrxjs.io/learn-rxjs/operators/filtering/take',
  inputs: [
    [
      { t: 30, x: 1 },
      { t: 40, x: 2 },
      { t: 65, x: 3 },
      { t: 75, x: 4 },
      { t: 85, c: true },
    ],
  ],
  apply: ([x$]) => x$.pipe(take(2)),
});

const _takeLast = createExample<[number], number>({
  name: 'takeLast',
  label: 'takeLast(1)',
  description: 'Emit the last n emitted values before completion.',
  linkToDocumentation:
    'https://www.learnrxjs.io/learn-rxjs/operators/filtering/takelast',
  inputs: [
    [
      { t: 30, x: 1 },
      { t: 40, x: 2 },
      { t: 65, x: 3 },
      { t: 75, x: 4 },
      { t: 85, c: true },
    ],
  ],
  apply: ([x$]) => x$.pipe(takeLast(1)),
});

const _takeUntil = createExample<[number, number], number>({
  name: 'takeUntil',
  label: 'x$.pipe(takeUntil(y$))',
  description: 'Emit values until provided observable emits.',
  linkToDocumentation:
    'https://www.learnrxjs.io/learn-rxjs/operators/filtering/takeuntil',
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
      { t: 45, x: 0 },
      { t: 73, x: 0 },
    ],
  ],
  apply: ([x$, y$]) => x$.pipe(takeUntil(y$)),
});

const _takeWhile = createExample<[number], number>({
  name: 'takeWhile',
  label: 'x$.pipe(takeWhile(x => x.content < 5))',
  description: 'Emit values until provided expression is false.',
  linkToDocumentation:
    'https://www.learnrxjs.io/learn-rxjs/operators/filtering/takewhile',
  inputs: [
    [
      { t: 5, x: 1 },
      { t: 20, x: 3 },
      { t: 35, x: 6 },
      { t: 50, x: 4 },
      { t: 65, x: 7 },
      { t: 80, x: 2 },
    ],
  ],
  apply: ([x$]) => x$.pipe(takeWhile((x) => x < 5)),
});

const _throttle = createExample<[number], number>({
  name: 'throttle',
  label: 'x$.pipe(throttle(x => timer(10 * x.content)))',
  description:
    'Emit value on the leading edge of an interval, but suppress new values until durationSelector has completed.',
  linkToDocumentation:
    'https://www.learnrxjs.io/learn-rxjs/operators/filtering/throttle',
  inputs: [
    [
      { t: 0, x: 1 },
      { t: 26, x: 2 },
      { t: 34, x: 1 },
      { t: 40, x: 1 },
      { t: 45, x: 2 },
      { t: 79, x: 1 },
    ],
  ],
  apply: ([x$], scheduler) =>
    x$.pipe(throttle((x) => timer(x * 10, scheduler))),
});

const _throttleTime = createExample<[string], string>({
  name: 'throttleTime',
  label: 'x$.pipe(throttleTime(25))',
  description: 'Emit first value then ignore for specified duration.',
  linkToDocumentation:
    'https://www.learnrxjs.io/learn-rxjs/operators/filtering/throttletime',
  inputs: [
    [
      { t: 0, x: 'A' },
      { t: 8, x: 'B' },
      { t: 16, x: 'C' },
      { t: 40, x: 'D' },
      { t: 55, x: 'E' },
      { t: 60, x: 'F' },
      { t: 70, x: 'G' },
    ],
  ],
  apply: ([x$], scheduler) => x$.pipe(throttleTime(25, scheduler)),
});

export const filteringExamples: ExampleFactory[] = [
  _debounce,
  _debounceTime,
  _distinct,
  _distinctUntilChanged,
  _filter,
  _find,
  _findIndex,
  _first,
  _ignoreElements,
  _last,
  _sample,
  _skip,
  _skipUntil,
  _skipWhile,
  _take,
  _takeLast,
  _takeUntil,
  _takeWhile,
  _throttle,
  _throttleTime,
];
