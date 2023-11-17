import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
  Signal,
} from '@angular/core';
import { TimelineElement } from '../../../../shared/timeline/components/timeline/timeline-element';
import {
  ExampleInputElements,
  TimelineElementsInputsGenerator,
} from '../../services/timeline-elements-inputs-generator/timeline-elements-inputs-generator.service';
import { TimelineElementsOutputsGenerator } from '../../services/timeline-elements-outputs-generator/timeline-elements-outputs-generator.service';
import { ColorsMapFactory } from '../../../../shared/timeline/services/colors-map-factory.service';
import { CurrentExampleProviderService } from '../../services/current-example-provider/current-example-provider.service';
import { HighlightedCodeComponent } from '../../../../shared/highlighted-code/components/highlighted-code.component';
import { TimelineComponent } from '../../../../shared/timeline/components/timeline/timeline.component';
import { NgFor, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ExampleHeaderComponent } from '../example-header/example-header.component';
import { TimelineInputNamePipe } from '../../pipes/timeline-input-name.pipe';

@Component({
  selector: 'app-example.ts',
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ExampleHeaderComponent,
    MatCardModule,
    NgFor,
    TimelineComponent,
    NgIf,
    HighlightedCodeComponent,
    TimelineInputNamePipe,
  ],
  providers: [CurrentExampleProviderService],
})
export class ExampleComponent {
  protected readonly MAX_FRAMES = 100;

  private readonly timelineElementsInputsGenerator = inject(
    TimelineElementsInputsGenerator,
  );

  private readonly timelineElementsOutputsGenerator = inject(
    TimelineElementsOutputsGenerator,
  );

  private readonly colorsMapFactory = inject(ColorsMapFactory);

  protected readonly $currentExample = inject(CurrentExampleProviderService, {
    self: true,
  }).$currentExample;

  private readonly inputElements: Signal<ExampleInputElements | null> =
    computed(() =>
      this.timelineElementsInputsGenerator.getInputElements(
        this.$currentExample()?.inputs,
      ),
    );

  /**
   * The input elements are defined on a signal as they can be updated over
   * time if a user drags and drop an element
   * @protected
   */
  protected readonly $currentTimelineElements = signal<
    TimelineElement[][] | null
  >(null);

  protected readonly $isMultiInput = computed(
    () => (this.inputElements()?.elements?.length ?? 0) > 1,
  );

  constructor() {
    effect(
      () =>
        this.$currentTimelineElements.set(
          this.inputElements()?.elements ?? null,
        ),
      {
        allowSignalWrites: true,
      },
    );
  }

  /**
   * Define one color map for all the examples, to keep the same colors
   * between examples
   * @protected
   */
  protected readonly $currentColorMap = computed(() => {
    const inputElements = this.inputElements();
    return inputElements?.colorsMap ?? this.colorsMapFactory.new();
  });

  protected readonly $output = computed(() => {
    const example = this.$currentExample();
    if (example?.apply == null) {
      return [];
    }
    const elements = this.$currentTimelineElements();
    if (elements == null) {
      return [];
    }
    return this.timelineElementsOutputsGenerator.getOutputElements(
      elements,
      example.apply,
      this.$currentColorMap(),
      this.MAX_FRAMES,
    );
  });

  /**
   * Updates the elements at the given index in the current timeline elements.
   *
   * @param {number} index - The index at which to update the elements.
   * @param {TimelineElement[]} elements - The new elements to be updated at the given index.
   *
   * @return {void}
   */
  protected elementsChanged(index: number, elements: TimelineElement[]): void {
    this.$currentTimelineElements.update((currentElements) => {
      const newElements = currentElements == null ? [] : [...currentElements];
      newElements[index] = elements;
      return newElements;
    });
  }
}
