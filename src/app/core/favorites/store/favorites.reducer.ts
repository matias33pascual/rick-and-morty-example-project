import { createReducer, on } from '@ngrx/store';
import { FavoritesState, initialFavoritesState } from './favorites.state';
import { addFavorite, removeFavorite } from './favorites.actions';

export const favoritesReducer = createReducer(
  initialFavoritesState,
  on(addFavorite, (state, { payload }) => ({
    ...state,
    favorites: [...state.favorites, payload],
  })),
  on(removeFavorite, (state, { payload }) => ({
    ...state,
    favorites: state.favorites.filter((fav) => fav.id !== payload),
  })),
);
