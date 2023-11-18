import { Injectable } from '@angular/core';
import { BoxifiedToObservable, ExampleApplyFn } from '../../../../data/example';
import {
  TimelineElement,
  TimelineElementType,
} from '../../../../shared/timeline/components/timeline/timeline-element';
import {
  map,
  Observable,
  Observer,
  takeUntil,
  timer,
  timestamp,
  toArray,
  VirtualTimeScheduler,
} from 'rxjs';
import { IColorsMap } from '../../../../shared/timeline/services/colors-map';

@Injectable({ providedIn: 'root' })
export class TimelineElementsOutputsGenerator {
  getOutputElements<TInputs extends unknown[], TOutput>(
    timelineElements: TimelineElement[][],
    applyFn: ExampleApplyFn<TInputs, TOutput>,
    colorsMap: IColorsMap,
    maxFrames: number,
  ): TimelineElement[] {
    const scheduler = new VirtualTimeScheduler(undefined, maxFrames + 1);

    const outputStream$ = this.generateOutputStream$(
      timelineElements,
      scheduler,
      applyFn,
      colorsMap,
      maxFrames,
    );

    let elements: TimelineElement[] = [];

    const addElement = (factory: (frame: number) => TimelineElement): void => {
      const frame = scheduler.now();
      if (frame <= maxFrames) {
        elements.push(factory(frame));
      }
    };

    outputStream$.subscribe({
      next: (actualElements) => (elements = actualElements),
      complete: () =>
        addElement((frame) => ({
          type: TimelineElementType.Completion,
          frame,
          id: elements.length,
        })),
      error: (error) =>
        addElement((frame) => ({
          type: TimelineElementType.Error,
          frame: frame,
          id: elements.length,
          value: error,
        })),
    });

    scheduler.flush();

    return elements;
  }

  private generateOutputStream$<TInputs extends unknown[], TOutput>(
    timelineElements: TimelineElement[][],
    scheduler: VirtualTimeScheduler,
    applyFn: ExampleApplyFn<TInputs, TOutput>,
    colorsMap: IColorsMap,
    maxFrames: number,
  ): Observable<TimelineElement[]> {
    const virtualStreams$: Observable<unknown>[] = timelineElements.map(
      (input) =>
        new Observable((observer) => {
          input.forEach((element) =>
            scheduler.schedule(
              this.getScheduledAction(element, observer),
              element.frame,
            ),
          );
        }),
    );

    return applyFn(
      (virtualStreams$ ?? []) as [...BoxifiedToObservable<TInputs>],
      scheduler,
    ).pipe(
      timestamp(scheduler),
      map(({ value, timestamp }) => ({
        type: TimelineElementType.Value,
        value,
        frame: timestamp,
        color: colorsMap.add(value),
      })),
      takeUntil(timer(maxFrames + 1, scheduler)),
      toArray(),
      map((elements) =>
        elements.map((element, index) => ({ ...element, id: index })),
      ),
    );
  }

  private getScheduledAction<TInput>(
    element: TimelineElement,
    observer: Observer<TInput>,
  ): () => void {
    switch (element.type) {
      case TimelineElementType.Value:
        return () => observer.next(element.value as TInput);
      case TimelineElementType.Completion:
        return () => observer.complete();
      case TimelineElementType.Error:
        return () => observer.error(element.value);
      default:
        throw new Error('Unknown element type');
    }
  }
}
