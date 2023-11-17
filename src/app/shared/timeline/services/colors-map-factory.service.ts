import { Injectable } from '@angular/core';
import { ColorsMap, IColorsMap } from './colors-map';

@Injectable({ providedIn: 'root' })
export class ColorsMapFactory {
  new(): IColorsMap {
    return new ColorsMap();
  }
}
