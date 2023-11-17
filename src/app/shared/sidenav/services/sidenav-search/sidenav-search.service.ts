import { inject, Injectable } from '@angular/core';
import { Example } from '../../../../data/example';
import { ExamplesProvider } from '../../../../pages/example/services/examples-provider/examples-provider.service';

@Injectable({ providedIn: 'root' })
export class SidenavSearchService {
  private readonly examplesProvider = inject(ExamplesProvider);

  getSearchResult(search: string): Example<unknown[], unknown>[] {
    return this.examplesProvider.allExamples.filter((example) =>
      this.matchesSearch(example.name, search),
    );
  }

  private matchesSearch(name: string, search: string): boolean {
    return name.trim().toLocaleLowerCase().includes(search);
  }
}
