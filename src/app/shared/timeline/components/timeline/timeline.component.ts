import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import { CdkDrag, CdkDragMove } from '@angular/cdk/drag-drop';
import { IColorsMap, TimelineElementColor } from '../../services/colors-map';
import {
  isCompletion,
  isError,
  isValue,
  TimelineElement,
  TimelineValueElement,
} from './timeline-element';
import { debounceTime, merge } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { fromPairs } from 'lodash-es';
import { GuardTypePipe } from '../../pipes/guard-type/guard-type-pipe';
import { TimelineCompletionComponent } from '../timeline-completion/timeline-completion.component';
import { TimelineValueComponent } from '../timeline-value/timeline-value.component';
import { NgClass } from '@angular/common';
import { TimelineErrorComponent } from '../timeline-error/timeline-error.component';
import { injectResize } from 'ngxtension/resize';
import { rxEffect } from 'ngxtension/rx-effect';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    TimelineValueComponent,
    CdkDrag,
    NgClass,
    TimelineCompletionComponent,
    GuardTypePipe,
    TimelineErrorComponent,
  ],
})
export class TimelineComponent {
  @ViewChild('timelineLine', { static: true })
  private readonly timelineLine?: ElementRef<HTMLDivElement> | null;

  readonly isDraggable = input(true);

  readonly elements = input.required<TimelineElement[]>();

  readonly colorsMap = input.required<IColorsMap>();

  readonly maxFrames = input.required<number>();

  readonly hasName = input.required<boolean>();

  readonly name = input<string | null>();

  readonly elementsChange = output<TimelineElement[]>();

  private readonly $initialFramePerId = signal<
    Record<number, number | undefined>
  >({});

  private readonly $lineWidthPixels = signal<number | undefined>(undefined);

  protected readonly isCompletion = isCompletion;

  protected readonly isValue = isValue;

  protected readonly isError = isError;

  constructor() {
    rxEffect(
      merge(
        injectResize({ debounce: 10 }),
        toObservable(this.elements),
        toObservable(this.elements).pipe(debounceTime(10))
      ),
      () => this.updatePositions()
    );
  }

  protected getElementColor<T>(
    element: TimelineValueElement<T>
  ): TimelineElementColor {
    return this.colorsMap().get(element.value) ?? TimelineElementColor.Color1;
  }

  /**
   * Method called when a drag movement occurs on a timeline element.
   * This updates the frame of the element being dragged, and emits the new elements array.
   * It is then the responsibility of the parent component to update the elements array.
   *
   * @param {CdkDragMove<void>} $event - The drag move event object.
   * @param {TimelineElement} element - The timeline element being dragged.
   *
   * @return {void} - No return value.
   */
  protected onDragMoved(
    $event: CdkDragMove<void>,
    element: TimelineElement
  ): void {
    const lineWidthPixels = this.$lineWidthPixels();
    if (lineWidthPixels == null) {
      return;
    }

    const { x } = $event.source.getFreeDragPosition();
    const newFrame = (x / lineWidthPixels) * this.maxFrames();
    if (newFrame === element.frame) {
      return;
    }

    element.frame = newFrame;

    this.$initialFramePerId.update((ifi) => ({
      ...ifi,
      [element.id]: undefined,
    }));

    this.elementsChange.emit(this.elements() ?? []);
  }

  /**
   * Retrieves the forced drag position for a given TimelineElement.
   * This is called when the timeline is initialized, and when the timeline is resized.
   *
   * @param {TimelineElement} element - The timeline element for which to retrieve the forced drag position.
   *
   * @return {{ x: number; y: number } | null} - The forced drag position, or null if the element has no initial frame.
   */
  protected getForcedDragPosition(
    element: TimelineElement
  ): { x: number; y: number } | null {
    const lineWidthPixels = this.$lineWidthPixels();
    if (lineWidthPixels == null) {
      return null;
    }
    const frame = this.$initialFramePerId()[element.id];
    if (frame == null) {
      return null;
    }
    const x = (frame / this.maxFrames()) * lineWidthPixels;
    return { x, y: 0 };
  }

  private updatePositions(): void {
    this.$lineWidthPixels.set(this.timelineLine?.nativeElement.offsetWidth);
    this.$initialFramePerId.set(
      fromPairs(this.elements().map(({ id, frame }) => [id, frame]))
    );
  }
}
