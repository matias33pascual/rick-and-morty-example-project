import { createReducer, on } from '@ngrx/store';
import { FavoritesState, initialFavoritesState } from './favorites.state';
import { addFavorite, removeFavorite } from './favorites.actions';

export const favoritesReducer = createReducer(
  initialFavoritesState,
  on(addFavorite, (state, { character }) => ({
    ...state,
    favorites: [...state.favorites, character],
  })),
  on(removeFavorite, (state, { characterId }) => ({
    ...state,
    favorites: state.favorites.filter((fav) => fav.id !== characterId),
  })),
);
