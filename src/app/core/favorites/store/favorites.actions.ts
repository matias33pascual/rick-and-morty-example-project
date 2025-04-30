import { Character } from '../../characters/models';
import { FavoritesActionTypes } from '../models/favorites-action-types.enum';

export const addFavorite = (character: Character) => ({
  type: FavoritesActionTypes.AddFavorite,
  character,
});

export const removeFavorite = (characterId: number) => ({
  type: FavoritesActionTypes.RemoveFavorite,
  characterId,
});
