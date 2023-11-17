// noinspection JSUnusedGlobalSymbols
/**
 * Represents the available colors for a timeline element.
 */
export enum TimelineElementColor {
  Color1 = 'color1',
  Color2 = 'color2',
  Color3 = 'color3',
  Color4 = 'color4',
  Color5 = 'color5',
  Color6 = 'color6',
  Color7 = 'color7',
  Color8 = 'color8',
  Color9 = 'color9',
}

/**
 * Represents a color map that associates values with colors.
 */
export interface IColorsMap {
  get<T>(value: T): TimelineElementColor | undefined;

  get<T>(value: T, defaultValue: TimelineElementColor): TimelineElementColor;

  add<T>(value: T): TimelineElementColor;
}

export class ColorsMap implements IColorsMap {
  private readonly map = new Map<unknown, TimelineElementColor>();

  get<T>(value: T): TimelineElementColor | undefined;
  get<T>(value: T, defaultValue: TimelineElementColor): TimelineElementColor;
  get<T>(
    value: T,
    defaultValue?: TimelineElementColor,
  ): TimelineElementColor | undefined {
    return this.map.get(value) ?? defaultValue;
  }

  add<T>(value: T): TimelineElementColor {
    if (this.map.has(value)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- checked above
      return this.map.get(value)!;
    }
    const color = this.getNextColor();
    this.map.set(value, color);
    return color;
  }

  private getNextColor(): TimelineElementColor {
    const colorsCount = Object.keys(TimelineElementColor).length;
    const index = this.map.size;
    return Object.values(TimelineElementColor)[
      index % colorsCount
    ] as TimelineElementColor;
  }
}
