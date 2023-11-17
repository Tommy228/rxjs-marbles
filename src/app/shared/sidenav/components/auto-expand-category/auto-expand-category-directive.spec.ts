import { AutoExpandCategoryDirective } from './auto-expand-category.directive';
import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';
import { ExpandableContentComponent } from '../expandable-content/expandable-content.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ExampleCategory } from '../../../../data/example-categories';
import { createExample, ExampleFactory } from '../../../../data/example';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';

describe('AutoExpandCategoryDirective', () => {
  let spectator: SpectatorDirective<AutoExpandCategoryDirective>;
  let expandableContent: ExpandableContentComponent;
  let router: Router;
  let ngZone: NgZone;

  const createDirective = createDirectiveFactory({
    directive: AutoExpandCategoryDirective,
    imports: [
      MockComponent(ExpandableContentComponent),
      RouterTestingModule.withRoutes([
        {
          path: 'filter',
          component: class {},
        },
        {
          path: 'debounceTime',
          component: class {},
        },
        {
          path: 'somewhere',
          component: class {},
        },
      ]),
    ],
  });

  beforeEach(() => {
    spectator = createDirective(
      `<app-expandable-content [appAutoExpandCategory]='category' />`,
      {
        hostProps: {
          category: new ExampleCategory('Category A', [
            createExample<[number], number>({
              name: 'filter',
            } as ExampleFactory as never),
            createExample<[number], number>({
              name: 'debounceTime',
            } as ExampleFactory as never),
          ]),
        },
      },
    );

    expandableContent = spectator.query(ExpandableContentComponent)!;
    jest.spyOn(expandableContent, 'setOpen');
    router = spectator.inject(Router);
    ngZone = spectator.inject(NgZone);
  });

  it('should create', () => {
    expect(spectator.directive).toBeTruthy();
  });

  it('should open the expandable content when the current route matches an example', waitForAsync(() => {
    ngZone.run(() => router.navigateByUrl('/filter'));
    spectator.fixture.whenStable().then(() => {
      expect(expandableContent.setOpen).toHaveBeenCalledExactlyOnceWith(
        true,
        false,
      );
    });
  }));

  it('should not open the expandable content when the current route does not match an example', waitForAsync(() => {
    ngZone.run(() => router.navigateByUrl('/somewhere'));
    spectator.fixture.whenStable().then(() => {
      expect(expandableContent.setOpen).not.toHaveBeenCalled();
    });
  }));
});
