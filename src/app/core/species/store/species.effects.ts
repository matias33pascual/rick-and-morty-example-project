import { inject, Injectable } from '@angular/core';
import { SpeciesService } from '../services/species.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadSpecies, loadSpeciesFailure, loadSpeciesSuccess } from './species.actions';
import { catchError, map, switchMap } from 'rxjs';
import { SpeciesCount } from '../models/species-count.interface';
import { of } from 'rxjs';

@Injectable()
export class SpeciesEffects {
  private actions$ = inject(Actions);
  private speciesService = inject(SpeciesService);

  loadSpecies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadSpecies),
      switchMap(() =>
        this.speciesService.getSpeciesCount().pipe(
          map((speciesCount: SpeciesCount[]) => loadSpeciesSuccess({ speciesCount })),
          catchError((error: string) => of(loadSpeciesFailure({ error }))),
        ),
      ),
    );
  });
}
