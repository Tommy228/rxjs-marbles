import { createPipeFactory } from '@ngneat/spectator/jest';
import { TimelineInputNamePipe } from './timeline-input-name.pipe';

describe('TimelineInputNamePipe', () => {
  const createPipe = createPipeFactory(TimelineInputNamePipe);

  it('should create', () => {
    const spectator = createPipe();
    expect(spectator).toBeTruthy();
  });

  it.each([
    [0, 'x$'],
    [1, 'y$'],
  ])('should transform the index %s to a name %s', (index, name) => {
    const spectator = createPipe('{{ index | timelineInputName }}', {
      hostProps: { index },
    });
    expect(spectator.element).toHaveText(name);
  });
});
