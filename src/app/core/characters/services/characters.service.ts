import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EMPTY, expand, map, Observable } from 'rxjs';
import { CharacterResponse } from '../models/character-response.interface';
import { Character, CharacterStatus } from '../models/character.interface';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private readonly baseUrl = 'https://rickandmortyapi.com/api/character';
  private readonly http = inject(HttpClient);

  getCharacters(page: number = 1, filter?: string, status?: CharacterStatus | null): Observable<CharacterResponse> {
    let url = `${this.baseUrl}?page=${page}`;

    if (filter && filter !== '') {
      url += `&name=${filter}`;
    }

    if (status) {
      url += `&status=${status}`;
    }

    return this.http.get<CharacterResponse>(url);
  }

  
}
