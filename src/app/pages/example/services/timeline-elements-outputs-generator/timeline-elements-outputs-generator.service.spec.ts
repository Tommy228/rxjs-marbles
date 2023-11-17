import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { TimelineElementsOutputsGenerator } from './timeline-elements-outputs-generator.service';
import {
  TimelineElement,
  TimelineElementType,
} from '../../../../shared/timeline/components/timeline/timeline-element';
import { TimelineElementColor } from '../../../../shared/timeline/services/colors-map';
import { ExampleApplyFn } from '../../../../data/example';
import { map, mergeMap } from 'rxjs';

describe('TimelineElementsOutputsGenerator', () => {
  let spectator: SpectatorService<TimelineElementsOutputsGenerator>;

  const createService = createServiceFactory(TimelineElementsOutputsGenerator);

  beforeEach(() => {
    spectator = createService();
  });

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });

  describe('getOutputElements', () => {
    it('should generate an output stream that applies the provided function', () => {
      const colorsMap = {
        get: jest.fn(),
        add: jest
          .fn()
          .mockImplementation((c) => mockedColors[c as TimelineElementColor]),
      };
      const mockedColors: { [key: string | number]: string } = {
        A1: TimelineElementColor.Color1,
        B1: TimelineElementColor.Color2,
        A3: TimelineElementColor.Color3,
        B3: TimelineElementColor.Color4,
      };
      const elements: TimelineElement[][] = [
        [
          {
            id: 0,
            type: TimelineElementType.Value,
            frame: 0,
            value: 'A',
            color: TimelineElementColor.Color1,
          },
          {
            id: 1,
            type: TimelineElementType.Value,
            frame: 3,
            value: 'B',
            color: TimelineElementColor.Color2,
          },
          {
            id: 3,
            type: TimelineElementType.Completion,
            frame: 80,
          },
        ],
        [
          {
            id: 0,
            type: TimelineElementType.Value,
            frame: 0,
            value: 1,
            color: TimelineElementColor.Color4,
          },
          {
            id: 1,
            type: TimelineElementType.Value,
            frame: 24,
            value: 3,
            color: TimelineElementColor.Color5,
          },
          {
            id: 2,
            type: TimelineElementType.Completion,
            frame: 28,
          },
        ],
      ];
      const applyFn: ExampleApplyFn<[string, number], string> = ([x$, y$]) =>
        x$.pipe(mergeMap((x) => y$.pipe(map((y) => x + y))));
      const result = spectator.service.getOutputElements(
        elements,
        applyFn,
        colorsMap,
        80,
      );
      const expected: TimelineElement[] = [
        {
          id: 0,
          type: TimelineElementType.Value,
          frame: 0,
          value: 'A1',
          color: TimelineElementColor.Color1,
        },
        {
          id: 1,
          type: TimelineElementType.Value,
          frame: 3,
          value: 'B1',
          color: TimelineElementColor.Color2,
        },
        {
          id: 2,
          type: TimelineElementType.Value,
          frame: 24,
          value: 'A3',
          color: TimelineElementColor.Color3,
        },
        {
          id: 3,
          type: TimelineElementType.Value,
          frame: 27,
          value: 'B3',
          color: TimelineElementColor.Color4,
        },
        {
          id: 4,
          type: TimelineElementType.Completion,
          frame: 80,
        },
      ];
      expect(result).toEqual(expected);
    });
  });
});
