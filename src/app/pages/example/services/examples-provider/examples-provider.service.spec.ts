import {
  EXAMPLE_CATEGORIES,
  ExampleCategory,
} from '../../../../data/example-categories';
import { createExample, ExampleFactory } from '../../../../data/example';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { ExamplesProvider } from './examples-provider.service';

describe('ExamplesProvider', () => {
  const testCategories: ExampleCategory[] = [
    new ExampleCategory('Category A', [
      createExample<[number], number>({
        name: 'filter',
      } as ExampleFactory as never),
      createExample<[number], number>({
        name: 'debounceTime',
      } as ExampleFactory as never),
    ]),
    new ExampleCategory('Category B', [
      createExample<[], number>({
        name: 'from',
      } as ExampleFactory as never),
    ]),
  ];

  let spectator: SpectatorService<ExamplesProvider>;

  const createService = createServiceFactory({
    service: ExamplesProvider,
    providers: [{ provide: EXAMPLE_CATEGORIES, useValue: testCategories }],
  });

  beforeEach(() => {
    spectator = createService();
  });

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });

  describe('getAll', () => {
    it('should return all the examples', () => {
      const allExamples = spectator.service.allExamples;
      expect(allExamples).toHaveLength(3);
      expect(allExamples[0].name).toEqual('filter');
      expect(allExamples[1].name).toEqual('debounceTime');
      expect(allExamples[2].name).toEqual('from');
    });
  });

  describe('getByName', () => {
    it('should return the example with the given name', () => {
      const example = spectator.service.getByName('debounceTime');
      expect(example).toBeDefined();
      expect(example?.name).toEqual('debounceTime');
    });

    it('should return undefined if the example does not exist', () => {
      const example = spectator.service.getByName('nonExistingExample');
      expect(example).toBeUndefined();
    });
  });
});
