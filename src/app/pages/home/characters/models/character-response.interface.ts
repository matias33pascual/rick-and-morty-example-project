import { Character } from './character.interface';
import { ResponseInfo } from './response-info.interface';

export interface CharacterResponse {
  info: ResponseInfo;
  results: Character[];
}
