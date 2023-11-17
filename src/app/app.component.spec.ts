import {
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator/jest';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { DarkModeService } from './shared/dark-mode/dark-mode.service';
import { MockComponent } from 'ng-mocks';
import { GithubLinkComponent } from './shared/github-link/github-link.component';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;

  const createComponent = createComponentFactory({
    component: AppComponent,
    imports: [
      MatCardModule,
      RouterTestingModule.withRoutes([]),
      MockComponent(GithubLinkComponent),
    ],
    providers: [mockProvider(DarkModeService, { $isDarkMode: () => false })],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
