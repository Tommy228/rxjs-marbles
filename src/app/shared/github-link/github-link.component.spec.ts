import { GithubLinkComponent } from './github-link.component';
import {
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator/jest';
import { signal, WritableSignal } from '@angular/core';
import { DarkModeService } from '../dark-mode/dark-mode.service';
import {
  MatIcon,
  MatIconModule,
  MatIconRegistry,
} from '@angular/material/icon';
import { MockBuilder } from 'ng-mocks';

describe('GithubLinkComponent', () => {
  let spectator: Spectator<GithubLinkComponent>;

  let $isDarkMode: WritableSignal<boolean>;

  const createComponent = createComponentFactory({
    component: GithubLinkComponent,
    mocks: [MatIconRegistry],
  });

  beforeEach(() => MockBuilder(GithubLinkComponent, MatIconModule));

  beforeEach(() => {
    $isDarkMode = signal(false);
    spectator = createComponent({
      providers: [mockProvider(DarkModeService, { $isDarkMode })],
    });
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should set the icon to black mode when dark mode is disabled', () => {
    $isDarkMode.set(false);
    spectator.detectChanges();
    expect(spectator.query(MatIcon)?.svgIcon).toBe('github-black');
  });

  it('should set the icon to white mode when dark mode is enabled', () => {
    $isDarkMode.set(true);
    spectator.detectChanges();
    expect(spectator.query(MatIcon)?.svgIcon).toBe('github-white');
  });
});
