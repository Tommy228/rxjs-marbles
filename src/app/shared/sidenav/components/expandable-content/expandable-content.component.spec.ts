import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ExpandableContentComponent } from './expandable-content.component';
import { MockBuilder } from 'ng-mocks';
import { MatIconModule } from '@angular/material/icon';

describe('ExpandableContentComponent', () => {
  let spectator: SpectatorHost<ExpandableContentComponent>;

  const createHost = createHostFactory({
    component: ExpandableContentComponent,
    imports: [NoopAnimationsModule],
  });

  beforeEach(() => MockBuilder(ExpandableContentComponent, MatIconModule));

  beforeEach(() => {
    spectator = createHost(
      `
      <app-expandable-content>
        <div header>Header</div>
        <div>Content</div>
      </app-expandable-content>`,
    );
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
