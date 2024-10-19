import { Component, computed, model, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-expandable-content',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './expandable-content.component.html',
  styleUrl: './expandable-content.component.scss',
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          overflow: 'hidden',
          height: '*',
        }),
      ),
      state(
        'close',
        style({
          overflow: 'hidden',
          height: '0',
        }),
      ),
      transition('open <=> close', animate('200ms ease-in-out')),
    ]),
    trigger('rotateIcon', [
      state(
        'pointing-bottom',
        style({
          transform: 'rotate(90deg)',
        }),
      ),
      state(
        'normal',
        style({
          transform: 'rotate(0deg)',
        }),
      ),
      transition('normal <=> pointing-bottom', animate('200ms ease-in-out')),
    ]),
  ],
})
export class ExpandableContentComponent {
  readonly open = model(false);

  protected readonly $animationDisabled = signal(true);

  private readonly $animationInProgress = signal(false);

  protected readonly $openCloseAnimationState: Signal<'open' | 'close'> =
    computed(() => (this.open() ? 'open' : 'close'));

  protected readonly $iconRotationAnimationState: Signal<
    'pointing-bottom' | 'normal'
  > = computed(() => (this.open() ? 'pointing-bottom' : 'normal'));

  setOpen(open: boolean, animate = true): void {
    if (this.$animationInProgress() || this.open() === open) {
      return;
    }
    this.$animationDisabled.set(!animate);
    this.open.set(open);
  }

  toggle(animate = true): void {
    this.setOpen(!this.open(), animate);
  }

  protected animationStarted(): void {
    this.$animationInProgress.set(true);
  }

  protected animationDone(): void {
    this.$animationInProgress.set(false);
    this.$animationDisabled.set(false);
  }
}
