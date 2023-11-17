import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'app-highlighted-code',
  templateUrl: './highlighted-code.component.html',
  styleUrl: './highlighted-code.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [Highlight],
})
export class HighlightedCodeComponent {
  @Input({ required: true }) code?: string;

  get isMultiline(): boolean {
    return this.code?.includes('\n') ?? false;
  }
}
