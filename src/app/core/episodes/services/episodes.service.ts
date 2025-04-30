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

  getCharactersFromEpisodeUrl(url: string): Observable<string> {
    return this.http.get<EpisodeResponse>(url).pipe(
      switchMap((response) => {
        if (response.characters.length === 0) {
          return of('No characters in this episode');
        }
        return this.getCharacterFromUrl(response.characters[0]).pipe(map((character) => character.name));
      }),
    );
  }

  private getCharacterFromUrl(url: string): Observable<Character> {
    return this.http.get<Character>(url);
  }
}
