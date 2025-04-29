import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TypesState } from './types.state';

export const selectTypesState = createFeatureSelector<TypesState>('types');

export const selectTypes = createSelector(selectTypesState, (state: TypesState) => state.types);

export const selectTypesLoading = createSelector(selectTypesState, (state: TypesState) => state.loading);

export const selectTypesError = createSelector(selectTypesState, (state: TypesState) => state.error);
