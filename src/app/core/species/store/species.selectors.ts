import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SpeciesState } from './species.state';

export const selectSpeciesState = createFeatureSelector<SpeciesState>('species');

export const selectSpeciesCount = createSelector(selectSpeciesState, (state: SpeciesState) => state.speciesCount);
export const selectSpeciesLoading = createSelector(selectSpeciesState, (state: SpeciesState) => state.loading);
export const selectSpeciesError = createSelector(selectSpeciesState, (state: SpeciesState) => state.error);
