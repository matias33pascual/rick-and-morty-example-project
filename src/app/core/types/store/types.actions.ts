import { createAction } from '@ngrx/store';
import { TypeCount } from '../models/type-count.interface';
import { TypeActionsTypes } from '../models/type-actions-types.enum';

export const loadTypes = createAction(TypeActionsTypes.LoadTypes);
export const loadTypesSuccess = createAction(TypeActionsTypes.LoadTypesSuccess, (typesCount: TypeCount[]) => ({
  typesCount,
}));
export const loadTypesError = createAction(TypeActionsTypes.LoadTypesError, (error: string) => ({ error }));
