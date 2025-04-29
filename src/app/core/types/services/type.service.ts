import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map, reduce } from 'rxjs/operators';
import { CharacterResponse } from '../../characters/models/character-response.interface';
import { Character } from '../../characters/models/character.interface';
import { TypeCount } from '../models/type-count.interface';
import { CharactersService } from '../../characters/services/characters.service';

@Injectable({
  providedIn: 'root',
})
export class TypeService {
  private readonly charactersService = inject(CharactersService);

  getTypeCount(): Observable<TypeCount[]> {
    return this.charactersService.fetchAllCharacters().pipe(
      map((response: CharacterResponse) => response.results),
      reduce((allCharacters: Character[], pageCharacters: Character[]) => [...allCharacters, ...pageCharacters], []),
      map((characters: Character[]) => {
        const typeCountMap = new Map<string, number>();

        characters.forEach((character: Character) => {
          const type = character.type || 'unknown';
          typeCountMap.set(type, (typeCountMap.get(type) || 0) + 1);
        });
        return Array.from(typeCountMap.entries()).map(([type, count]) => ({ type, count }));
      }),
      map((typeCount: TypeCount[]) => typeCount.sort((a, b) => b.count - a.count)),
    );
  }
}
