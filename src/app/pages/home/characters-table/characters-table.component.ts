import { Component, inject, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from '../../../core/characters/models/character.interface';
import { Store } from '@ngrx/store';
import {
  selectCharacters,
  selectCharactersInfo,
  selectCurrentPage,
} from '../../../core/characters/store/characters.selectors';
import { CharactersState } from '../../../core/characters/store/characters.state';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CharacterResponseInfo } from '../../../core/characters/models/character-response-info.interface';
import { loadCharacters, changePage } from '../../../core/characters/store/characters.actions';

@Component({
  selector: 'app-characters-table',
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  templateUrl: './characters-table.component.html',
  styleUrl: './characters-table.component.css',
})
export class CharactersTableComponent {
  characters$: Observable<Character[]>;
  info$: Observable<CharacterResponseInfo>;
  currentPage$: Observable<number>;

  displayedColumns: string[] = ['name', 'status', 'species', 'type', 'gender', 'created'];

  private store = inject(Store<CharactersState>);

  constructor() {
    this.characters$ = this.store.select(selectCharacters);
    this.info$ = this.store.select(selectCharactersInfo);
    this.currentPage$ = this.store.select(selectCurrentPage);
  }

  onPageChange(event: PageEvent) {
    const newPage = event.pageIndex + 1;
    this.store.dispatch(changePage({ page: newPage }));
    this.store.dispatch(loadCharacters({ page: newPage }));
  }
}
