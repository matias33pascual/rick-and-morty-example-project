import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map, switchMap, of } from 'rxjs';
import { Character } from '../../characters/models';
import { EpisodeResponse } from '../interfaces/episode-response.interface';

@Injectable({
  providedIn: 'root',
})
export class EpisodesService {
  private readonly http = inject(HttpClient);

  constructor() {}

  getEpisodeInfo(url: string): Observable<EpisodeResponse> {
    return this.http.get<EpisodeResponse>(url);
  }

  getCharactersFromEpisodeUrl(url: string): Observable<string> {
    return this.http.get<EpisodeResponse>(url).pipe(
      switchMap((response) => {
        if (response.characters.length === 0) {
          return of('No characters in this episode');
        }
        const randomIndex = Math.floor(Math.random() * response.characters.length);
        return this.getCharacterFromUrl(response.characters[randomIndex]).pipe(map((character) => character.name));
      }),
    );
  }

  private getCharacterFromUrl(url: string): Observable<Character> {
    return this.http.get<Character>(url);
  }
}
