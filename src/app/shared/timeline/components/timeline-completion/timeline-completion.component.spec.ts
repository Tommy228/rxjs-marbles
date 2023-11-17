import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { TimelineCompletionComponent } from './timeline-completion.component';

describe('TimelineCompletionComponent', () => {
  let spectator: Spectator<TimelineCompletionComponent>;

  const createComponent = createComponentFactory(TimelineCompletionComponent);

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
