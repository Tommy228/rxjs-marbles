import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { SidebarComponent } from './shared/sidenav/components/sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SidenavAutomaticModeDirective } from './shared/sidenav/directives/sidenav-automatic-mode/sidenav-automatic-mode.directive';
import { GithubLinkComponent } from './shared/github-link/github-link.component';
import { SidenavBreakpointHandlerService } from './shared/sidenav/services/sidenav-breakpoint-handler/sidenav-breakpoint-handler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    SidenavAutomaticModeDirective,
    SidebarComponent,
    MatCardModule,
    RouterOutlet,
    GithubLinkComponent,
  ],
})
export class AppComponent {
  protected readonly $sideNavOpen = inject(SidenavBreakpointHandlerService)
    .$permanent;
}
