import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { SidebarComponent } from './sidebar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent, MockDirective } from 'ng-mocks';
import { ExpandableContentComponent } from '../expandable-content/expandable-content.component';
import { SidebarExamplesComponent } from '../sidebar-examples/sidebar-examples.component';
import { AutoExpandCategoryDirective } from '../auto-expand-category/auto-expand-category.directive';
import {
  EXAMPLE_CATEGORIES,
  ExampleCategory,
} from '../../../../data/example-categories';
import { createExample, ExampleFactory } from '../../../../data/example';

describe('SidebarComponent', () => {
  const testCategories: ExampleCategory[] = [
    new ExampleCategory('Category A', [
      createExample<[number], number>({
        name: 'filter',
      } as ExampleFactory as never),
      createExample<[number], number>({
        name: 'filter2',
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

  let spectator: Spectator<SidebarComponent>;

  const createComponent = createComponentFactory({
    component: SidebarComponent,
    imports: [
      RouterTestingModule.withRoutes([]),
      MockComponent(ExpandableContentComponent),
      MockComponent(SidebarExamplesComponent),
      MockDirective(AutoExpandCategoryDirective),
    ],
    providers: [
      {
        provide: EXAMPLE_CATEGORIES,
        useValue: testCategories,
      },
    ],
    shallow: true,
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('categories', () => {
    it('should display the categories', () => {
      const categories = spectator.queryAll(ExpandableContentComponent);
      expect(categories).toHaveLength(2);

      const firstExamples = spectator.queryAll(SidebarExamplesComponent)[0];
      expect(firstExamples.examples).toEqual(testCategories[0].examples);

      const secondExamples = spectator.queryAll(SidebarExamplesComponent)[1];
      expect(secondExamples.examples).toEqual(testCategories[1].examples);
    });
  });

  describe('search', () => {
    const inputId = '#operator-search';

    const getInput = () => spectator.query<HTMLInputElement>(inputId)!;

    beforeEach(() => {
      getInput().value = 'filter';
      const event = new KeyboardEvent('keyup');
      jest.spyOn(event, 'target', 'get').mockReturnValue(getInput());
      spectator.triggerEventHandler(inputId, 'keyup', event);
      spectator.detectChanges();
    });

    it('should not display the expandable content if the search is not empty', () => {
      expect(spectator.query(ExpandableContentComponent)).toBeNull();
    });

    it('should display the search result if the search is not empty', () => {
      const examplesComponent = spectator.query(SidebarExamplesComponent);
      expect(examplesComponent?.examples).toEqual([
        testCategories[0].examples[0],
        testCategories[0].examples[1],
      ]);
    });
  });
});
