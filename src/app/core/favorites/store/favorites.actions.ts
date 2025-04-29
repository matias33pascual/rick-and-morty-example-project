import { createAction } from '@ngrx/store';
import { Character } from '../../characters/models/character.interface';

export const addFavorite = createAction('[Favorites] Add Favorite', (character: Character) => ({ payload: character }));

export const removeFavorite = createAction('[Favorites] Remove Favorite', (characterId: number) => ({
  payload: characterId,
}));
