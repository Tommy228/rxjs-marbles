import { ChangeDetectionStrategy, Component, computed, input, Input } from '@angular/core';
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
  readonly code = input.required<string>();

  protected readonly isMultiline = computed<boolean>(() => this.code().includes('\n'));
}
