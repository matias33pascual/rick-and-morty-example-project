import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore, StoreModule } from '@ngrx/store';
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { CharactersEffects } from './core/characters/store/characters.effects';
import { charactersReducer } from './core/characters/store/characters.reducer';
import { speciesReducer } from './core/species/store/species.reducer';
import { SpeciesEffects } from './core/species/store/species.effects';
import { typesReducer } from './core/types/store/types.reducer';
import { TypesEffects } from './core/types/store/types.effects';
import { favoritesReducer } from './core/favorites/store/favorites.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({
      characters: charactersReducer,
      species: speciesReducer,
      types: typesReducer,
      favorites: favoritesReducer,
    }),
    provideHttpClient(),
    provideEffects([CharactersEffects, SpeciesEffects, TypesEffects]),
  ],
};
