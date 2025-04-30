import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectFavorites } from '../../core/favorites/store/favorites.selectors';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private store = inject(Store);

  @Output() favoriteSelected = new EventEmitter<number>();

  favorites$ = this.store.select(selectFavorites);
  selectedFavorite: number | null = null;

  onFavoriteSelect(characterId: number) {
    this.favoriteSelected.emit(characterId);
  }
}
