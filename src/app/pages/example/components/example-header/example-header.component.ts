import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CurrentExampleProviderService } from '../../services/current-example-provider/current-example-provider.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-example-header',
  templateUrl: './example-header.component.html',
  styleUrl: './example-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatDividerModule, MatButtonModule],
})
export class ExampleHeaderComponent {
  private readonly currentExampleProvider = inject(CurrentExampleProviderService);

  protected readonly currentExample$ =
    this.currentExampleProvider.$currentExample;
}
