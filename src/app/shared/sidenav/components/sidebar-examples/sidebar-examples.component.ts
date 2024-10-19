import { Component, input, TrackByFunction } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Example } from '../../../../data/example';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-sidebar-examples',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatListModule],
  templateUrl: './sidebar-examples.component.html',
  styleUrl: './sidebar-examples.component.scss',
})
export class SidebarExamplesComponent {
  readonly examples = input.required<readonly Example<unknown[], unknown>[]>();

  protected readonly trackByExampleName: TrackByFunction<
    Example<unknown[], unknown>
  > = (_, { name }) => name;
}
