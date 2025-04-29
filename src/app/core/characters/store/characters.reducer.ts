import { createReducer, on } from '@ngrx/store';
import { Character, CharacterResponseInfo } from '../models';
import { loadCharacters, loadCharactersSuccess, loadCharactersFailure, changePage } from './characters.actions';
import { initialState } from './characters.state';
import { CharactersState } from './characters.state';

export const charactersReducer = createReducer(
  initialState,

  on(loadCharacters, (state: CharactersState, { page }) => ({
    ...state,
    loading: true,
    error: null,
    currentPage: page,
  })),

  on(
    loadCharactersSuccess,
    (state: CharactersState, { characters, info }: { characters: Character[]; info: CharacterResponseInfo }) => ({
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

  on(changePage, (state: CharactersState, { page }) => ({
    ...state,
    currentPage: page,
  })),
);
