import { createAction } from '@ngrx/store';
import { Character } from '../../characters/models';
import { FavoritesActionTypes } from '../models/favorites-action-types.enum';

export const addFavorite = createAction(FavoritesActionTypes.AddFavorite, (character: Character) => ({
  payload: character,
}));

export const removeFavorite = createAction(FavoritesActionTypes.RemoveFavorite, (characterId: number) => ({
  payload: characterId,
}));

export const loadFavorites = createAction(FavoritesActionTypes.LoadFavorites);

export const saveFavorites = createAction(FavoritesActionTypes.SaveFavorites);
