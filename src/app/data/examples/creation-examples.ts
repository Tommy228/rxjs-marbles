import { delayWhen, from, interval, of, timer } from 'rxjs';
import { createExample, ExampleFactory } from '../example';

const _from = createExample<[], number>({
  name: 'from',
  description: 'Turn an array, promise, or iterable into an observable.',
  linkToDocumentation:
    'https://www.learnrxjs.io/learn-rxjs/operators/creation/from',
  label: `from([10, 20, 30]).pipe(delayWhen(x => timer(x)))`,
  apply: (_, scheduler) =>
    from([10, 20, 30]).pipe(delayWhen((value) => timer(value, scheduler))),
});

const _interval = createExample<[], number>({
  name: 'interval',
  description: 'Emit numbers in sequence based on provided timeframe.',
  linkToDocumentation:
    'https://www.learnrxjs.io/learn-rxjs/operators/creation/interval',
  label: 'interval(10)',
  apply: (_, scheduler) => interval(10, scheduler),
});

const _of = createExample<[], number>({
  name: 'of',
  description:
    'Emit variable amount of values in a sequence and then emits a complete notification.',
  linkToDocumentation:
    'https://www.learnrxjs.io/learn-rxjs/operators/creation/of',
  label: 'of(1)',
  apply: () => of(1),
});

const _timer = createExample<[], number>({
  name: 'timer',
  description:
    'After given duration, emit numbers in sequence every specified duration.',
  linkToDocumentation:
    'https://www.learnrxjs.io/learn-rxjs/operators/creation/timer',
  label: 'timer(30, 10)',
  apply: (_, scheduler) => timer(30, 10, scheduler),
});

export const creationExamples: ExampleFactory[] = [
  _from,
  _interval,
  _of,
  _timer,
];
