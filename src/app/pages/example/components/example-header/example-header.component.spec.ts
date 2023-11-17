import { ExampleHeaderComponent } from './example-header.component';
import {
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator/jest';
import { CurrentExampleProviderService } from '../../services/current-example-provider/current-example-provider.service';
import { Example } from '../../../../data/example';

describe('ExampleHeaderComponent', () => {
  let spectator: Spectator<ExampleHeaderComponent>;

  const createComponent = createComponentFactory({
    component: ExampleHeaderComponent,
    providers: [
      mockProvider(CurrentExampleProviderService, {
        $currentExample: () =>
          ({
            name: 'some name',
            label: 'some label',
            description: 'some description',
            linkToDocumentation: 'https://some-link.com',
            inputs: [[]],
            apply: ([input]) => input,
          }) satisfies Example<[never], never>,
      }),
    ],
    shallow: true,
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should display the example', () => {
    expect(spectator.query('[data-title]')).toHaveText('some name');
    expect(spectator.query('[data-description]')).toHaveText(
      'some description',
    );
    expect(spectator.query('[data-documentation-link]')).toHaveProperty(
      'href',
      'https://some-link.com/',
    );
  });
});
