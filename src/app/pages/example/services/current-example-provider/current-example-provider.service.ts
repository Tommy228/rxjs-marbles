import { computed, inject, Injectable, Signal } from '@angular/core';
import { Example } from '../../../../data/example';
import { ActivatedRoute, Params } from '@angular/router';
import { ExamplesProvider } from '../examples-provider/examples-provider.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable()
export class CurrentExampleProviderService {
  private readonly examplesProvider = inject(ExamplesProvider);

  private readonly $activatedRouteParams = toSignal(
    inject(ActivatedRoute).params,
    {
      initialValue: {} as Params,
    },
  );

  readonly $currentExample: Signal<Example<unknown[], unknown> | null> =
    computed(() => {
      const id = this.$activatedRouteParams()['id'];
      const example = this.examplesProvider.getByName(id);
      return example ?? null;
    });
}
