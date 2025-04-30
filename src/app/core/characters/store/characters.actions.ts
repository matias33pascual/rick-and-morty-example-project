import { createAction, props } from '@ngrx/store';
import { Character, CharactersActionTypes, CharacterResponseInfo, CharacterStatus } from '../models';

export const loadCharacters = createAction(
  CharactersActionTypes.LoadCharacters,
  props<{ page: number; filter?: string; status?: CharacterStatus | null }>(),
);

export const loadCharactersSuccess = createAction(
  CharactersActionTypes.LoadCharactersSuccess,
  props<{ characters: Character[]; info: CharacterResponseInfo }>(),
);

export const loadCharactersFailure = createAction(
  CharactersActionTypes.LoadCharactersFailure,
  props<{ error: string }>(),
);

export const changePage = createAction(CharactersActionTypes.ChangePage, props<{ page: number }>());

export const loadCharacterById = createAction(CharactersActionTypes.LoadCharacterById, props<{ id: number }>());

export const loadCharacterByIdSuccess = createAction(
  CharactersActionTypes.LoadCharacterByIdSuccess,
  props<{ character: Character }>(),
);

export const loadCharacterByIdFailure = createAction(
  CharactersActionTypes.LoadCharacterByIdFailure,
  props<{ error: string }>(),
);
