import { createAction, props } from '@ngrx/store';
import { Character, CharactersActionTypes, ResponseInfo } from '../models';

export const loadCharacters = createAction(CharactersActionTypes.LoadCharacters);

export const loadCharactersSuccess = createAction(
  CharactersActionTypes.LoadCharactersSuccess,
  props<{ characters: Character[]; info: ResponseInfo }>(),
);

export const loadCharactersFailure = createAction(
  CharactersActionTypes.LoadCharactersFailure,
  props<{ error: string }>(),
);
