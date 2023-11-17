import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DarkModeService } from '../dark-mode/dark-mode.service';

@Component({
  selector: 'app-github-link',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './github-link.component.html',
  styleUrl: './github-link.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GithubLinkComponent {
  private readonly blackIcon = 'github-black';

  private readonly whiteIcon = 'github-white';

  private readonly $isDarkMode = inject(DarkModeService).$isDarkMode;

  protected readonly $icon = computed(() =>
    this.$isDarkMode() ? this.whiteIcon : this.blackIcon,
  );

  constructor() {
    this.registerIcons();
  }

  private registerIcons(): void {
    const matIconRegistry = inject(MatIconRegistry);
    const domSanitizer = inject(DomSanitizer);
    matIconRegistry.addSvgIcon(
      this.blackIcon,
      domSanitizer.bypassSecurityTrustResourceUrl('github-mark.svg'),
      { viewBox: '0 0 98 96' },
    );
    matIconRegistry.addSvgIcon(
      this.whiteIcon,
      domSanitizer.bypassSecurityTrustResourceUrl(
        'github-mark-white.svg',
      ),
      { viewBox: '0 0 98 96' },
    );
  }
}
