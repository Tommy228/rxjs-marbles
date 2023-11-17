import { Observable, SchedulerLike } from 'rxjs';

/**
 * Represents an example input that can be either of type TInput or a cancellation.
 * @template TInput - The type of the input.
 */
export type ExampleInput<TInput> =
  | {
      t: number;
      x: TInput;
      c?: undefined;
    }
  | {
      t: number;
      c: true;
    };

/**
 * Unpacks an array to keep the generic type only.
 * @example UnpackedArray<Array<number>> = number
 */
export type UnpackedArray<T> = T extends Array<infer U> ? U : T;

/**
 * Takes an array of types, and boxifies them into an array of observables.
 * @example BoxifiedToObservable<[string, number]> = [Observable<string>, Observable<number>]
 */
export type BoxifiedToObservable<T> = {
  [P in keyof T]: Observable<UnpackedArray<T[P]>>;
};

/**
 * Defines the "apply" (i.e. transform) function of an example.
 * @example ExampleApplyFn<[string, boolean], number> =
 *  (inputs: [Observable<string>, Observable<boolean>], scheduler: SchedulerLike) => Observable<number>
 */
export type ExampleApplyFn<TInputs extends unknown[], TOutput> = (
  inputs: [...BoxifiedToObservable<TInputs>],
  scheduler: SchedulerLike,
) => Observable<TOutput>;

/**
 * Takes an array of types, and boxifies them into an array of example inputs
 * @example BoxifiedToExampleInput<[string, number]> = [ExampleInput<string>[], ExampleInput<number>[]]
 */
export type BoxifiedToExampleInput<T> = {
  [P in keyof T]: ExampleInput<UnpackedArray<T[P]>>[];
};

export interface Example<TInputs extends unknown[], TOutput> {
  name: string;
  description: string;
  linkToDocumentation: string;
  label: string;
  inputs?: [...BoxifiedToExampleInput<TInputs>];
  completionFrame?: number;
  apply: ExampleApplyFn<TInputs, TOutput>;
}

export type ExampleFactory = <R>(
  cb: <TInputs extends unknown[], TOutput>(
    example: Example<TInputs, TOutput>,
  ) => R,
) => R;

export const createExample =
  <TInputs extends unknown[], TOutput>(
    d: Example<TInputs, TOutput>,
  ): ExampleFactory =>
  (cb) =>
    cb(d);
