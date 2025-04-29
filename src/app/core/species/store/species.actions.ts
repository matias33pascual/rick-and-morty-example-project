import { createAction, props } from '@ngrx/store';
import { SpeciesActionTypes } from '../models/species-action-types.enum';
import { SpeciesCount } from '../models/species-count.interface';

export const loadSpecies = createAction(SpeciesActionTypes.LoadSpecies);

export const loadSpeciesSuccess = createAction(
  SpeciesActionTypes.LoadSpeciesSuccess,
  props<{ speciesCount: SpeciesCount[] }>(),
);

export const loadSpeciesFailure = createAction(SpeciesActionTypes.LoadSpeciesFailure, props<{ error: string }>());
