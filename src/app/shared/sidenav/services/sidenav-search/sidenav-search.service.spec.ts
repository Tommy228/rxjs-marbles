import {
  createServiceFactory,
  mockProvider,
  SpectatorService,
} from '@ngneat/spectator/jest';
import { SidenavSearchService } from './sidenav-search.service';
import { ExamplesProvider } from '../../../../pages/example/services/examples-provider/examples-provider.service';

describe('SidenavSearchService', () => {
  let spectator: SpectatorService<SidenavSearchService>;
  const createService = createServiceFactory({
    service: SidenavSearchService,
    providers: [
      mockProvider(ExamplesProvider, {
        allExamples: [
          { name: 'Example 1' },
          { name: 'Example 2' },
          { name: 'Some random text' },
        ],
      }),
    ],
  });

  beforeEach(() => {
    spectator = createService();
  });

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('should return filtered search results', () => {
    const results = spectator.service.getSearchResult('example');
    expect(results.length).toBe(2);
    expect(results).toEqual([{ name: 'Example 1' }, { name: 'Example 2' }]);
  });

  it('should return an empty array for no matching search results', () => {
    const results = spectator.service.getSearchResult('Non-existent');
    expect(results.length).toBe(0);
    expect(results).toEqual([]);
  });
});
