import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-timeline-value',
  templateUrl: './timeline-value.component.html',
  styleUrl: './timeline-value.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class TimelineValueComponent<TValue> {
  @Input({ required: true }) value?: TValue;
  @Input() isDraggable?: boolean | null = true;
}
