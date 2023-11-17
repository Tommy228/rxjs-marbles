import { creationExamples } from './examples/creation-examples';
import { InjectionToken } from '@angular/core';
import { Example, ExampleFactory } from './example';
import { filteringExamples } from './examples/filtering-examples';
import { transformationExamples } from './examples/transformation-examples';
import { conditionalExamples } from './examples/conditional-examples';
import { combinationExamples } from './examples/combination-examples';
import { utilityExamples } from './examples/utility-examples';

export class ExampleCategory {
  readonly examples: readonly Example<unknown[], unknown>[] = Object.freeze(
    this.exampleFactories.map((factory) =>
      factory((x) => x as Example<unknown[], unknown>),
    ),
  );

  constructor(
    public readonly name: string,
    private readonly exampleFactories: ExampleFactory[],
  ) {}
}

export const categories: ExampleCategory[] = [
  new ExampleCategory('Combination', combinationExamples),
  new ExampleCategory('Conditional', conditionalExamples),
  new ExampleCategory('Creation', creationExamples),
  new ExampleCategory('Filtering', filteringExamples),
  new ExampleCategory('Transformations', transformationExamples),
  new ExampleCategory('Utility', utilityExamples),
];

export const EXAMPLE_CATEGORIES = new InjectionToken('EXAMPLE_CATEGORIES', {
  providedIn: 'root',
  factory: () => categories,
});
