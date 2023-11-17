import {
  createServiceFactory,
  mockProvider,
  SpectatorService,
} from '@ngneat/spectator/jest';
import { TimelineElementsInputsGenerator } from './timeline-elements-inputs-generator.service';
import {
  IColorsMap,
  TimelineElementColor,
} from '../../../../shared/timeline/services/colors-map';
import { ColorsMapFactory } from '../../../../shared/timeline/services/colors-map-factory.service';
import { ExampleInput } from '../../../../data/example';
import { TimelineElementType } from '../../../../shared/timeline/components/timeline/timeline-element';

describe('TimelineElementsInputsGenerator', () => {
  let spectator: SpectatorService<TimelineElementsInputsGenerator>;

  const createService = createServiceFactory(TimelineElementsInputsGenerator);

  let colorsMap: IColorsMap;

  beforeEach(() => {
    colorsMap = {
      get: jest.fn(),
      add: jest.fn(),
    };
    spectator = createService({
      providers: [
        mockProvider(ColorsMapFactory, {
          new: () => colorsMap,
        }),
      ],
    });
  });

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });

  describe('getInputElements', () => {
    it('should convert example input elements to timeline elements', () => {
      const inputs: [ExampleInput<string>[], ExampleInput<number>[]] = [
        [
          { t: 0, x: 'A' },
          { t: 3, x: 'B' },
          { t: 6, x: 'C' },
        ],
        [
          { t: 0, x: 1 },
          { t: 24, x: 3 },
          { t: 28, c: true },
        ],
      ];
      const mockedColors: Record<string | number, TimelineElementColor> = {
        A: TimelineElementColor.Color1,
        B: TimelineElementColor.Color2,
        C: TimelineElementColor.Color3,
        1: TimelineElementColor.Color4,
        3: TimelineElementColor.Color5,
      };
      jest
        .spyOn(colorsMap, 'add')
        .mockImplementation((c) => mockedColors[c as TimelineElementColor]);
      const result = spectator.service.getInputElements(inputs);
      expect(result.elements).toEqual([
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
            id: 2,
            type: TimelineElementType.Value,
            frame: 6,
            value: 'C',
            color: TimelineElementColor.Color3,
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
      ]);
      expect(result.colorsMap).toBe(colorsMap);
    });
  });
});
