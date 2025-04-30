import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Character } from '../../../core/characters/models/character.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-characters-detail',
  imports: [MatSidenavModule, MatButtonModule, MatIconModule],
  templateUrl: './characters-detail.component.html',
  styleUrl: './characters-detail.component.css',
})
export class CharactersDetailComponent {
  @Input() character: Character | null = null;
  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }
}
