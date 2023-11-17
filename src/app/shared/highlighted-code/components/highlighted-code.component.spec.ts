import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { Highlight } from 'ngx-highlightjs';
import { HighlightedCodeComponent } from './highlighted-code.component';
import { MockDirective } from 'ng-mocks';

describe('HighlightedCodeComponent', () => {
  let spectator: Spectator<HighlightedCodeComponent>;

  const createComponent = createComponentFactory({
    component: HighlightedCodeComponent,
    declarations: [MockDirective(Highlight)],
  });

  beforeEach(() => {
    spectator = createComponent({
      props: {
        code: 'alert("Hello, World!");',
      }
    });
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
