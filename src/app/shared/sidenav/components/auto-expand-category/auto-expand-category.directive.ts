import { Directive, inject, Input, signal } from '@angular/core';
import { ExpandableContentComponent } from '../expandable-content/expandable-content.component';
import { Event as RouterEvent, NavigationEnd, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ExampleCategory } from '../../../../data/example-categories';

@Directive({
  selector: '[appAutoExpandCategory]',
  standalone: true,
})
export class AutoExpandCategoryDirective {
  private readonly $category = signal<ExampleCategory | undefined>(undefined);

  @Input('appAutoExpandCategory')
  set category(category: ExampleCategory) {
    this.$category.set(category);
  }

  private readonly expandableContent = inject(ExpandableContentComponent);

  constructor() {
    inject(Router)
      .events.pipe(takeUntilDestroyed())
      .subscribe((navigation) => this.onNavigation(navigation));
  }

  private onNavigation(navigation: RouterEvent): void {
    if (!(navigation instanceof NavigationEnd)) {
      return;
    }

    if (!this.shouldExpand(navigation.urlAfterRedirects)) {
      return;
    }

    this.expandableContent.setOpen(true, false);
  }

  private shouldExpand(url: string): boolean {
    const category = this.$category();
    if (category == null) {
      return false;
    }
    return category.examples.some(({ name }) => url.endsWith(name));
  }
}
