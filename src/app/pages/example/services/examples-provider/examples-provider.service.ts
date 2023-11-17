import { inject, Injectable } from '@angular/core';
import { EXAMPLE_CATEGORIES } from '../../../../data/example-categories';
import { keyBy } from 'lodash-es';
import { Example } from '../../../../data/example';

@Injectable({ providedIn: 'root' })
export class ExamplesProvider {
  readonly allExamples: Example<unknown[], unknown>[] = inject(
    EXAMPLE_CATEGORIES,
  ).flatMap((category) => category.examples);

  private readonly exampleByName: {
    [id: string]: Example<unknown[], unknown>;
  } = keyBy(this.allExamples, (example) => example.name);

  getByName(name: string): Example<unknown[], unknown> | undefined {
    return this.exampleByName[name];
  }
}
