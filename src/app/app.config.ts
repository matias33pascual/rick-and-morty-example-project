import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore, StoreModule } from '@ngrx/store';
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { CharactersEffects } from './core/characters/store/characters.effects';
import { charactersReducer } from './core/characters/store/characters.reducer';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({ characters: charactersReducer }),
    provideHttpClient(),
    provideEffects([CharactersEffects]),
  ],
};
