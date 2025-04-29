import { CharacterLocation } from '@interfaces/character-location.interface';
import { ResourceBase } from '@interfaces/resource-base.interface';

export enum CharacterStatus {
  Alive = 'Alive',
  Dead = 'Dead',
  Unknown = 'unknown',
}

export interface Character extends ResourceBase {
  status: CharacterStatus;
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin: CharacterLocation;
  location: CharacterLocation;
  image: string;
  episode: string[];
}
