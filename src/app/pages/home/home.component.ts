import { Component, inject } from '@angular/core';
import { CharacterResponseInfo } from '../../core/characters/models';
import { Observable } from 'rxjs';
import { loadCharacters, loadCharacterById } from '../../core/characters/store/characters.actions';
import { Store } from '@ngrx/store';
import { CharactersState } from '../../core/characters/store/characters.state';
import { Character } from '../../core/characters/models';
import {
  selectCharacters,
  selectCharactersLoading,
  selectCharactersError,
  selectCharactersInfo,
} from '../../core/characters/store/characters.selectors';
import { CharactersTableComponent } from './characters-table/characters-table.component';
import { CharactersDetailComponent } from './characters-detail/characters-detail.component';
import { CharactersService } from '../../core/characters/services/characters.service';

@Component({
  selector: 'app-home',
  imports: [CharactersTableComponent, CharactersDetailComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  characters$: Observable<Character[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  info$: Observable<CharacterResponseInfo>;
  selectedCharacter: Character | null = null;

  private store = inject(Store<CharactersState>);
  private charactersService = inject(CharactersService);

  constructor() {
    this.characters$ = this.store.select(selectCharacters);
    this.loading$ = this.store.select(selectCharactersLoading);
    this.error$ = this.store.select(selectCharactersError);
    this.info$ = this.store.select(selectCharactersInfo);
  }

  ngOnInit(): void {
    this.store.dispatch(loadCharacters({ page: 1 }));
  }

  onCharacterSelected(characterId: number): void {
    this.charactersService.getCharacterById(characterId).subscribe({
      next: (character) => {
        this.selectedCharacter = character;
      },
      error: (error) => {
        console.error('Error loading character:', error);
        this.selectedCharacter = null;
      },
    });
  }
}
