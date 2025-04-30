import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map, switchMap, of } from 'rxjs';
import { Character } from '../../characters/models';

@Injectable({
  providedIn: 'root',
})
export class LocationsService {
  private readonly http = inject(HttpClient);

  constructor() {}

  getResidentsFromLocationUrl(url: string): Observable<Character[]> {
    return this.http.get<string[]>(url).pipe(
      switchMap((residents) => {
        if (residents.length === 0) {
          return of([]);
        }
        return this.getCharacterFromUrl(residents[0]).pipe(map((character) => [character]));
      }),
    );
  }

  private getCharacterFromUrl(url: string): Observable<Character> {
    return this.http.get<Character>(url);
  }
}
