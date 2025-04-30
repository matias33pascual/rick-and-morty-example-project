import { Component, Input } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Character } from '../../../core/characters/models/character.interface';

@Component({
  selector: 'app-characters-detail',
  imports: [MatSidenavModule],
  templateUrl: './characters-detail.component.html',
  styleUrl: './characters-detail.component.css',
})
export class CharactersDetailComponent {
  @Input() character: Character | null = null;
}
