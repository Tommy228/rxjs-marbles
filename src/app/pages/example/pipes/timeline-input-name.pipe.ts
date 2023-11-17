import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timelineInputName',
  standalone: true,
})
export class TimelineInputNamePipe implements PipeTransform {
  transform(value: number): string {
    return this.getName(value) + '$';
  }

  private getName(index: number): string {
    const names = ['x', 'y', 'z', 'w', 'v', 'u', 't', 's', 'r', 'q'];
    return names[index % names.length];
  }
}
