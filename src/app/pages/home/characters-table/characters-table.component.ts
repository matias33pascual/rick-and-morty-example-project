import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { Character, CharacterStatus } from '../../../core/characters/models/character.interface';
import { CharactersService } from '../../../core/characters/services/characters.service';
import { BehaviorSubject, Observable, combineLatest, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectFavorites } from '../../../core/favorites/store/favorites.selectors';
import { addFavorite, removeFavorite } from '../../../core/favorites/store/favorites.actions';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-characters-table',
  templateUrl: './characters-table.component.html',
  styleUrls: ['./characters-table.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
  ],
})
export class CharactersTableComponent implements OnInit {
  displayedColumns: string[] = ['favorite', 'name', 'status', 'species', 'type', 'gender', 'created'];
  dataSource = new MatTableDataSource<Character>([]);
  currentPage$ = new BehaviorSubject<number>(1);
  statusFilter: CharacterStatus | null = null;
  nameFilter = '';
  info$ = new BehaviorSubject<{ count: number; pages: number }>({ count: 0, pages: 0 });
  characters$: Observable<Character[]> = of([]);
  favorites$: Observable<Character[]> = of([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private charactersService: CharactersService, private store: Store) {}

  ngOnInit(): void {
    this.favorites$ = this.store.select(selectFavorites);

    this.characters$ = combineLatest([this.currentPage$, this.favorites$]).pipe(
      switchMap(([page, favorites]) => {
        return this.charactersService.getCharacters(page, this.nameFilter, this.statusFilter).pipe(
          tap((response) => {
            this.info$.next({
              count: response.info.count,
              pages: response.info.pages,
            });
          }),
          map((response) => response.results),
        );
      }),
    );
  }

  onPageChange(event: PageEvent): void {
    this.currentPage$.next(event.pageIndex + 1);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.nameFilter = filterValue.trim().toLowerCase();
    this.currentPage$.next(1);
  }

  applyStatusFilter(status: CharacterStatus | null): void {
    this.statusFilter = status;
    this.currentPage$.next(1);
  }

  isFavorite(character: Character, favorites: Character[] | null): boolean {
    if (!favorites) return false;
    return favorites.some((fav) => fav.id === character.id);
  }

  toggleFavorite(character: Character, isCurrentlyFavorite: boolean): void {
    if (isCurrentlyFavorite) {
      this.store.dispatch(removeFavorite(character.id));
    } else {
      this.store.dispatch(addFavorite(character));
    }
  }
}
