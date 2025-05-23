import { inject, Injectable } from '@angular/core';
import { CharactersService } from '../services/characters.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, switchMap } from 'rxjs';
import { loadCharacters, loadCharactersSuccess, loadCharactersFailure, loadCharacterById, loadCharacterByIdSuccess, loadCharacterByIdFailure } from './characters.actions';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

import { CharacterResponse } from '../models/character-response.interface';

@Injectable()
export class CharactersEffects {
  private actions$ = inject(Actions);
  private charactersService = inject(CharactersService);

  loadCharacters$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadCharacters),
      switchMap(({ page, filter, status }) =>
        this.charactersService.getCharacters(page, filter, status).pipe(
          map((charactersResponse: CharacterResponse) =>
            loadCharactersSuccess({ characters: charactersResponse.results, info: charactersResponse.info }),
          ),
          catchError((error) => of(loadCharactersFailure({ error }))),
        ),
      ),
    );
  });

  loadCharacterById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadCharacterById),
      switchMap(({ id }) => this.charactersService.getCharacterById(id).pipe(
        map((character) => loadCharacterByIdSuccess({ character })),
        catchError((error) => of(loadCharacterByIdFailure({ error }))),
      )),
    );
  });
}