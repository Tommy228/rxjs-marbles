import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-timeline-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline-error.component.html',
  styleUrl: './timeline-error.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineErrorComponent {}
