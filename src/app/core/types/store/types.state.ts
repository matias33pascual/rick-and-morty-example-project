import { TypeCount } from '../models/type-count.interface';

export interface TypesState {
  types: TypeCount[];
  loading: boolean;
  error: string | null;
}

export const initialTypesState: TypesState = {
  types: [],
  loading: false,
  error: null,
};
