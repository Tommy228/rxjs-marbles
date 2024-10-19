import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-timeline-value',
  templateUrl: './timeline-value.component.html',
  styleUrl: './timeline-value.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class TimelineValueComponent<TValue> {
  readonly value = input.required<TValue>();
  readonly isDraggable = input(true);
}
