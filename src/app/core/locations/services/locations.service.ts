import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map, switchMap, of } from 'rxjs';
import { Character } from '../../characters/models';
import { LocationResponse } from '../interfaces/location-response.interface';

@Injectable({
  providedIn: 'root',
})
export class LocationsService {
  private readonly http = inject(HttpClient);

  constructor() {}

  getResidentsFromLocationUrl(url: string): Observable<string> {
    return this.http.get<LocationResponse>(url).pipe(
      switchMap((response) => {
        if (response.residents.length === 0) {
          return of('No known residents');
        }
        return this.getCharacterFromUrl(response.residents[0]).pipe(map((character) => character.name));
      }),
    );
  }

  private getCharacterFromUrl(url: string): Observable<Character> {
    return this.http.get<Character>(url);
  }
}
