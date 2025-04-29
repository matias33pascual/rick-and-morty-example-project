import { Character } from './character.interface';
import { CharacterResponseInfo } from './character-response-info.interface';

export interface CharacterResponse {
  info: CharacterResponseInfo;
  results: Character[];
}
