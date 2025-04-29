import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FavoritesState } from './favorites.state';

export const selectFavoritesState = createFeatureSelector<FavoritesState>('favorites');

export const selectFavorites = createSelector(selectFavoritesState, (state: FavoritesState) => state.favorites);
