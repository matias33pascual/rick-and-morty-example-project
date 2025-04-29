import { Character } from '../../characters/models/character.interface';

export interface FavoritesState {
  favorites: Character[];
}

export const initialFavoritesState: FavoritesState = {
  favorites: [],
};
