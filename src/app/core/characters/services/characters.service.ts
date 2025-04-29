import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CharacterResponse } from '../models/character-response.interface';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private readonly apiUrl = 'https://rickandmortyapi.com/api/character';
  private readonly http = inject(HttpClient);

  getCharacters(page: number = 1): Observable<CharacterResponse> {
    return this.http.get<CharacterResponse>(`${this.apiUrl}?page=${page}`);
  }
}
