import { SpeciesCount } from '../models/species-count.interface';

export interface SpeciesState {
  speciesCount: SpeciesCount[];
  loading: boolean;
  error: string | null;
}

export const initialState: SpeciesState = {
  speciesCount: [],
  loading: false,
  error: null,
};
