import { Character, CharacterResponseInfo } from '../models';

export interface CharactersState {
  characters: Character[];
  info: CharacterResponseInfo;
  loading: boolean;
  error: string | null;
  currentPage: number;
}

export const initialState: CharactersState = {
  characters: [],
  info: {
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  },
  loading: false,
  error: null,
  currentPage: 1,
};
