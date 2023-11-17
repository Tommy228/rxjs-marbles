import { TimelineErrorComponent } from './timeline-error.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

describe('TimelineErrorComponent', () => {
  let spectator: Spectator<TimelineErrorComponent>;

  const createComponent = createComponentFactory(TimelineErrorComponent);

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
