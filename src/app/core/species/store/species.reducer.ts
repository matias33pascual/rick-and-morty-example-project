import { createReducer, on } from '@ngrx/store';
import { initialState } from './species.state';
import { loadSpecies, loadSpeciesSuccess, loadSpeciesFailure } from './species.actions';
import { SpeciesState } from './species.state';
export const speciesReducer = createReducer(
  initialState,

  on(loadSpecies, (state: SpeciesState) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(loadSpeciesSuccess, (state: SpeciesState, { speciesCount }) => ({
    ...state,
    speciesCount,
    loading: false,
  })),

  on(loadSpeciesFailure, (state: SpeciesState, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
