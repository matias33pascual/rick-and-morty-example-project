import { createReducer, on } from '@ngrx/store';
import { Character, ResponseInfo } from '../models';
import { loadCharacters, loadCharactersSuccess, loadCharactersFailure } from './characters.actions';
import { initialState } from './characters.state';
import { CharactersState } from './characters.state';

export const charactersReducer = createReducer(
  initialState,
  on(loadCharacters, (state: CharactersState) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    loadCharactersSuccess,
    (state: CharactersState, { characters, info }: { characters: Character[]; info: ResponseInfo }) => ({
      ...state,
      characters,
      info,
      loading: false,
    }),
  ),
  on(loadCharactersFailure, (state: CharactersState, { error }: { error: string }) => ({
    ...state,
    loading: false,
    error: error,
  })),
);
