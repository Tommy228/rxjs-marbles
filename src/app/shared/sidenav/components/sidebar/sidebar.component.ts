import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
  TrackByFunction,
} from '@angular/core';
import {
  EXAMPLE_CATEGORIES,
  ExampleCategory,
} from '../../../../data/example-categories';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CurrentExampleProviderService } from '../../../../pages/example/services/current-example-provider/current-example-provider.service';
import { ExpandableContentComponent } from '../expandable-content/expandable-content.component';
import { AutoExpandCategoryDirective } from '../auto-expand-category/auto-expand-category.directive';
import { SidebarExamplesComponent } from '../sidebar-examples/sidebar-examples.component';
import { isEmpty } from 'lodash-es';
import { SidenavSearchService } from '../../services/sidenav-search/sidenav-search.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatInputModule,
    MatListModule,
    MatDividerModule,
    ReactiveFormsModule,
    NgForOf,
    RouterLink,
    RouterLinkActive,
    ExpandableContentComponent,
    AutoExpandCategoryDirective,
    SidebarExamplesComponent,
  ],
  providers: [CurrentExampleProviderService],
})
export class SidebarComponent {
  protected readonly categories = inject(EXAMPLE_CATEGORIES);

  private readonly searchService = inject(SidenavSearchService);

  private readonly $search = signal<string | undefined>(undefined);

  private readonly $cleanedUpSearch = computed(
    () => this.$search()?.toLocaleLowerCase().trim(),
  );

  protected readonly $searching = computed(() => !isEmpty(this.$search()));

  protected readonly $searchResult = computed(() => {
    const search = this.$cleanedUpSearch();
    return search != null ? this.searchService.getSearchResult(search) : [];
  });

  protected readonly trackByCategoryName: TrackByFunction<ExampleCategory> = (
    _,
    { name },
  ) => name;

  protected searchChange(eventTarget: EventTarget | null): void {
    this.$search.set((eventTarget as HTMLInputElement)?.value);
  }
}
