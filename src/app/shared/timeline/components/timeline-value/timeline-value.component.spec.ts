import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { TimelineValueComponent } from './timeline-value.component';

describe('TimelineValueComponent', () => {
  let spectator: Spectator<TimelineValueComponent<never>>;

  const createComponent = createComponentFactory<TimelineValueComponent<never>>(
    TimelineValueComponent,
  );

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
