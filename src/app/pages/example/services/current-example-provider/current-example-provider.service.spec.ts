import {
  createServiceFactory,
  mockProvider,
  SpectatorService,
  SpyObject,
} from '@ngneat/spectator/jest';
import { ActivatedRoute, Params } from '@angular/router';
import { CurrentExampleProviderService } from './current-example-provider.service';
import { Subject } from 'rxjs';
import { ExamplesProvider } from '../examples-provider/examples-provider.service';
import { Example } from '../../../../data/example';

describe('CurrentExampleProviderService', () => {
  let spectator: SpectatorService<CurrentExampleProviderService>;

  let params: Subject<Params>;
  let examplesProvider: SpyObject<ExamplesProvider>;

  const example: Example<unknown[], unknown> = {
    name: 'some name',
    label: 'some label',
    description: 'some description',
    linkToDocumentation: 'https://some-link.com',
    inputs: [[]],
    apply: ([input]) => input,
  };

  const createService = createServiceFactory(CurrentExampleProviderService);

  beforeEach(() => {
    params = new Subject<Params>();
    spectator = createService({
      providers: [
        mockProvider(ActivatedRoute, { params }),
        mockProvider(ExamplesProvider, {
          getByName: jest.fn().mockReturnValue(undefined),
        }),
      ],
    });
    examplesProvider = spectator.inject(ExamplesProvider);
  });

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });

  describe('$currentExample', () => {
    it('should return null by default', () => {
      expect(spectator.service.$currentExample()).toBeNull();
    });

    it('should return the example with the name from the route', () => {
      params.next({ id: example.name });
      examplesProvider.getByName.mockReturnValueOnce(example);
      expect(spectator.service.$currentExample()).toBe(example);
      expect(examplesProvider.getByName).toHaveBeenCalledExactlyOnceWith(
        example.name,
      );
    });

    it('should return null when the example with the name from the route does not exist', () => {
      examplesProvider.getByName.mockReturnValueOnce(undefined);
      params.next({ id: 'non-existent-example' });
      expect(spectator.service.$currentExample()).toBeNull();
      expect(examplesProvider.getByName).toHaveBeenCalledExactlyOnceWith(
        'non-existent-example',
      );
    });
  });
});
