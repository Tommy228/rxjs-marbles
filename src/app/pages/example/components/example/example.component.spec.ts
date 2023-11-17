import {
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator/jest';
import { ExampleComponent } from './example.component';
import { MockComponent } from 'ng-mocks';
import { ExampleHeaderComponent } from '../example-header/example-header.component';
import { TimelineComponent } from '../../../../shared/timeline/components/timeline/timeline.component';
import { HighlightedCodeComponent } from '../../../../shared/highlighted-code/components/highlighted-code.component';
import { CurrentExampleProviderService } from '../../services/current-example-provider/current-example-provider.service';
import { Example } from '../../../../data/example';
import { map, mergeMap } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { TimelineElementColor } from '../../../../shared/timeline/services/colors-map';
import {
  TimelineElement,
  TimelineElementType,
} from '../../../../shared/timeline/components/timeline/timeline-element';
import { last } from 'lodash-es';

describe('ExampleComponent', () => {
  let spectator: Spectator<ExampleComponent>;

  const createComponent = createComponentFactory({
    component: ExampleComponent,
    declarations: [
      MockComponent(ExampleHeaderComponent),
      MockComponent(TimelineComponent),
      MockComponent(HighlightedCodeComponent),
    ],
    componentProviders: [
      mockProvider(CurrentExampleProviderService, {
        $currentExample: () =>
          ({
            name: 'mergeMap',
            label: '',
            description: '',
            linkToDocumentation: '',
            inputs: [
              [
                { t: 0, x: 'A' },
                { t: 3, x: 'B' },
                { t: 6, x: 'C' },
              ],
              [
                { t: 0, x: 1 },
                { t: 12, x: 2 },
                { t: 24, x: 3 },
                { t: 28, c: true },
              ],
            ],
            apply: ([x$, y$]) =>
              x$.pipe(mergeMap((x) => y$.pipe(map((y) => x + y)))),
          }) satisfies Example<[string, number], string>,
      }),
    ],
    shallow: true,
  });

  const getTimelines = () => spectator.queryAll(TimelineComponent);

  beforeEach(() => {
    spectator = createComponent();
    TestBed.flushEffects();
    spectator.detectChanges();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should set the inputs and outputs corresponding to the current example', () => {
    const timelines = getTimelines();
    expect(timelines.length).toBe(3);
    for (const timeline of timelines) {
      expect(timeline?.elements).toMatchSnapshot();
    }
  });

  it('should update the inputs and outputs when an input changes', () => {
    const firstTimeline = getTimelines()[0];
    const newTimeline: TimelineElement[] = [
      {
        color: TimelineElementColor.Color1,
        frame: 5,
        id: 0,
        type: TimelineElementType.Value,
        value: 'A',
      },
      {
        frame: 100,
        id: 1,
        type: TimelineElementType.Completion,
      },
    ];
    firstTimeline.elementsChange.emit(newTimeline);
    spectator.detectChanges();
    const timelines = getTimelines();
    expect(timelines.length).toBe(3);
    expect(timelines[0]?.elements).toEqual(newTimeline);
    expect(last(timelines)?.elements).toMatchSnapshot();
  });
});
