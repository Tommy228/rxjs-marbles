import { inject, Injectable } from '@angular/core';
import {
  BoxifiedToExampleInput,
  ExampleInput,
  UnpackedArray,
} from '../../../../data/example';
import {
  TimelineElement,
  TimelineElementType,
} from '../../../../shared/timeline/components/timeline/timeline-element';
import { IColorsMap } from '../../../../shared/timeline/services/colors-map';
import { ColorsMapFactory } from '../../../../shared/timeline/services/colors-map-factory.service';

export type ExampleInputElements = {
  elements: TimelineElement[][];
  colorsMap: IColorsMap;
};

@Injectable({ providedIn: 'root' })
export class TimelineElementsInputsGenerator {
  private readonly colorsMapFactory = inject(ColorsMapFactory);

  getInputElements<TInputs extends unknown[]>(
    inputs: [...BoxifiedToExampleInput<TInputs>] | undefined,
  ): ExampleInputElements {
    const colorsMap = this.colorsMapFactory.new();

    const elements =
      inputs?.map((i) => this.generateTimeline(i, colorsMap)) ?? [];

    return { elements, colorsMap };
  }

  private generateTimeline(
    input: ExampleInput<UnpackedArray<unknown>>[],
    colorsMap: IColorsMap,
  ): TimelineElement[] {
    return input.map((el, index) =>
      el.c === true
        ? {
            type: TimelineElementType.Completion,
            id: index,
            frame: el.t,
          }
        : {
            type: TimelineElementType.Value,
            id: index,
            value: el.x,
            frame: el.t,
            color: colorsMap.add(el.x),
          },
    );
  }
}
