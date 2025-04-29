import { createAction, props } from '@ngrx/store';
import { Character, CharactersActionTypes, CharacterResponseInfo } from '../models';

export const loadCharacters = createAction(CharactersActionTypes.LoadCharacters, props<{ page: number }>());

export const loadCharactersSuccess = createAction(
  CharactersActionTypes.LoadCharactersSuccess,
  props<{ characters: Character[]; info: CharacterResponseInfo }>(),
);

export const loadCharactersFailure = createAction(
  CharactersActionTypes.LoadCharactersFailure,
  props<{ error: string }>(),
);

export const changePage = createAction(CharactersActionTypes.ChangePage, props<{ page: number }>());
