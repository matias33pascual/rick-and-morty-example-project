import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CharacterResponse } from '../models/character-response.interface';
import { CharacterStatus } from '../models/character.interface';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private readonly apiUrl = 'https://rickandmortyapi.com/api/character';
  private readonly http = inject(HttpClient);

  getCharacters(page: number = 1, filter?: string, status?: CharacterStatus | null): Observable<CharacterResponse> {
    let url = `${this.apiUrl}?page=${page}`;

    if (filter && filter !== '') {
      url += `&name=${filter}`;
    }

    if (status) {
      url += `&status=${status}`;
    }

    return this.http.get<CharacterResponse>(url);
  }
}
