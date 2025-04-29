import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CharactersState } from './characters.state';

export const selectCharactersState = createFeatureSelector<CharactersState>('characters');

export const selectCharacters = createSelector(selectCharactersState, (state: CharactersState) => state.characters);
export const selectCharactersInfo = createSelector(selectCharactersState, (state: CharactersState) => state.info);
export const selectCharactersLoading = createSelector(selectCharactersState, (state: CharactersState) => state.loading);
export const selectCharactersError = createSelector(selectCharactersState, (state: CharactersState) => state.error);
export const selectCurrentPage = createSelector(selectCharactersState, (state: CharactersState) => state.currentPage);
