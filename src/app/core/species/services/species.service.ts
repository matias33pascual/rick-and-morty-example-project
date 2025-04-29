import { HttpClient } from '@angular/common/http';
import { map, reduce } from 'rxjs';
import { EMPTY, expand } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { CharacterResponse } from '../../characters/models/character-response.interface';
import { Observable } from 'rxjs';
import { Character } from '../../characters/models/character.interface';
import { SpeciesCount } from '../models/species-count.interface';

@Injectable({
  providedIn: 'root',
})
export class SpeciesService {
  private readonly baseUrl = 'https://rickandmortyapi.com/api/character';
  private readonly http = inject(HttpClient);

  private fetchAllCharacters(): Observable<CharacterResponse> {
    return this.http
      .get<CharacterResponse>(this.baseUrl)
      .pipe(
        expand((response: CharacterResponse) =>
          response.info.next ? this.http.get<CharacterResponse>(response.info.next) : EMPTY,
        ),
      );
  }

  getSpeciesCount(): Observable<SpeciesCount[]> {
    return this.fetchAllCharacters().pipe(
      map((response: CharacterResponse) => response.results),
      reduce((allCharacters: Character[], pageCharacters: Character[]) => [...allCharacters, ...pageCharacters], []),
      map((characters: Character[]) => {
        const speciesCountMap = new Map<string, number>();

        characters.forEach((character: Character) => {
          const species = character.species;
          speciesCountMap.set(species, (speciesCountMap.get(species) || 0) + 1);
        });
        return Array.from(speciesCountMap.entries()).map(([species, count]) => ({ species, count }));
      }),
    );
  }
}
