import { Component, inject, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Character, CharacterStatus } from '../../../core/characters/models/character.interface';
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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-characters-table',
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './characters-table.component.html',
  styleUrl: './characters-table.component.css',
})
export class CharactersTableComponent {
  characters$: Observable<Character[]>;
  info$: Observable<CharacterResponseInfo>;
  currentPage$: Observable<number>;

  filter: string = '';
  statusFilter: CharacterStatus | null = null;
  CharacterStatus = CharacterStatus;

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
    this.store.dispatch(loadCharacters({ page: newPage, filter: this.filter, status: this.statusFilter }));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filter = filterValue;
    this.store.dispatch(loadCharacters({ page: 1, filter: filterValue, status: this.statusFilter }));
  }

  applyStatusFilter(status: CharacterStatus | null) {
    this.statusFilter = status;
    this.store.dispatch(loadCharacters({ page: 1, filter: this.filter, status: this.statusFilter }));
  }
}
