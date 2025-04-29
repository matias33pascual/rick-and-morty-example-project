import { createReducer, on } from '@ngrx/store';
import { TypesState, initialTypesState } from './types.state';
import { loadTypes, loadTypesSuccess, loadTypesError } from './types.actions';

export const typesReducer = createReducer(
  initialTypesState,
  on(
    loadTypes,
    (state): TypesState => ({
      ...state,
      loading: true,
      error: null,
    }),
  ),

  on(
    loadTypesSuccess,
    (state, { typesCount }): TypesState => ({
      ...state,
      types: typesCount,
      loading: false,
    }),
  ),

  on(
    loadTypesError,
    (state, { error }): TypesState => ({
      ...state,
      error,
      loading: false,
    }),
  ),
);
