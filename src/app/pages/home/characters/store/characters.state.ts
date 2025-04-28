import { Character, ResponseInfo } from '../models';

export interface CharactersState {
  characters: Character[];
  info: ResponseInfo;
  loading: boolean;
  error: string | null;
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
};
