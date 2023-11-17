import { SidebarExamplesComponent } from './sidebar-examples.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBuilder } from 'ng-mocks';
import { MatListModule } from '@angular/material/list';
import { Example } from '../../../../data/example';

describe('SidebarExampleComponent', () => {
  let spectator: Spectator<SidebarExamplesComponent>;

  const createComponent = createComponentFactory({
    component: SidebarExamplesComponent,
    imports: [RouterTestingModule.withRoutes([])],
  });

  beforeEach(() => {
    MockBuilder(SidebarExamplesComponent, MatListModule);
    spectator = createComponent();
    spectator.setInput('examples', [
      {
        name: 'filter',
      } as Example<unknown[], unknown>,
      {
        name: 'debounceTime',
      } as Example<unknown[], unknown>,
    ]);
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should display the examples', () => {
    const links = spectator.queryAll('a');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveProperty('href', 'http://localhost/filter');
    expect(links[0]).toHaveText('filter');
    expect(links[1]).toHaveProperty('href', 'http://localhost/debounceTime');
    expect(links[1]).toHaveText('debounceTime');
  });
});
