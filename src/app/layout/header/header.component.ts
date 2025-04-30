import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectFavorites } from '../../core/favorites/store/favorites.selectors';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Character } from '../../core/characters/models';
import { take } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private store = inject(Store);
  private router = inject(Router);

  @Output() favoriteSelected = new EventEmitter<Character>();

  favorites$ = this.store.select(selectFavorites);
  selectedFavorite: number | null = null;

  onFavoriteSelect(characterId: number) {
    this.favorites$.pipe(take(1)).subscribe((favorites) => {
      const character = favorites[characterId];
      this.favoriteSelected.emit(character);
    });
  }
}
