import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { TypeService } from '../services/type.service';
import { loadTypes, loadTypesSuccess, loadTypesError } from './types.actions';
import { TypeCount } from '../models/type-count.interface';

@Injectable()
export class TypesEffects {
  private actions$ = inject(Actions);
  private typeService = inject(TypeService);

  loadTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTypes),
      switchMap(() =>
        this.typeService.getTypeCount().pipe(
          map((typesCount: TypeCount[]) => loadTypesSuccess(typesCount)),
          catchError((error: string) => of(loadTypesError(error))),
        ),
      ),
    ),
  );
}
