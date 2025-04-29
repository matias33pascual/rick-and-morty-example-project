import { CharacterLocation } from '@interfaces/character-location.interface';
import { ResourceBase } from '@interfaces/resource-base.interface';

export interface Character extends ResourceBase {
  status: 'Dead' | 'Alive' | 'unknown';
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin: CharacterLocation;
  location: CharacterLocation;
  image: string;
  episode: string[];
}
