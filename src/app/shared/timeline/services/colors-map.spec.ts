import { ColorsMap, IColorsMap, TimelineElementColor } from './colors-map';

describe('ColorsMap', () => {
  let colorsMap: IColorsMap;

  beforeEach(() => {
    colorsMap = new ColorsMap();
  });

  it('should return undefined for an unknown value', () => {
    const unknownValue = 'unknown';
    const color = colorsMap.get(unknownValue);

    expect(color).toBeUndefined();
  });

  it('should return the default color for an unknown value', () => {
    const unknownValue = 'unknown';
    const defaultColor = TimelineElementColor.Color4;
    const color = colorsMap.get(unknownValue, defaultColor);

    expect(color).toBe(defaultColor);
  });

  it('should return the same color for the same value', () => {
    const value = 'sameValue';

    const firstColor = colorsMap.add(value);
    const secondColor = colorsMap.get(value);

    expect(secondColor).toBe(firstColor);
  });

  it('should return a different color for a different value', () => {
    const firstValue = 'firstValue';
    const secondValue = 'secondValue';

    const firstColor = colorsMap.add(firstValue);
    const secondColor = colorsMap.add(secondValue);

    expect(secondColor).not.toBe(firstColor);
  });

  it('should cycle through colors for multiple values', () => {
    const values = ['value1', 'value2', 'value3', 'value4'];
    const expectedColors = [
      TimelineElementColor.Color1,
      TimelineElementColor.Color2,
      TimelineElementColor.Color3,
      TimelineElementColor.Color4,
    ];

    values.forEach((value, index) => {
      const color = colorsMap.add(value);
      expect(color).toBe(expectedColors[index]);
    });
  });
});
