import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  Routes,
} from '@angular/router';
import { ExamplesProvider } from './pages/example/services/examples-provider/examples-provider.service';
import { first } from 'lodash-es';
import { ExampleComponent } from './pages/example/components/example/example.component';

const canActivate: CanActivateFn = async (route: ActivatedRouteSnapshot) => {
  const exampleProvider = inject(ExamplesProvider);
  const router = inject(Router);

  const example = exampleProvider.getByName(route.params['id']);

  if (!example) {
    const defaultExample = first(exampleProvider.allExamples);
    if (defaultExample == null) {
      throw new Error('No examples');
    }
    await router.navigate(['/', defaultExample.name]);
  }

  return true;
};

export const appRoutes: Routes = [
  {
    path: ':id',
    canActivate: [canActivate],
    component: ExampleComponent,
  },
  {
    path: '',
    redirectTo: 'combineLatest',
    pathMatch: 'full',
  },
];

