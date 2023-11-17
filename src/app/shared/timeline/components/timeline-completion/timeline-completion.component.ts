import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({
  selector: 'app-timeline-completion',
  templateUrl: './timeline-completion.component.html',
  styleUrl: './timeline-completion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class TimelineCompletionComponent {}
