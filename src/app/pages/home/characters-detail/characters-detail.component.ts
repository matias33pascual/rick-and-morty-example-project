import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Character } from '../../../core/characters/models/character.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { CharactersService } from '../../../core/characters/services/characters.service';
import { LocationsService } from '../../../core/locations/services/locations.service';

@Component({
  selector: 'app-characters-detail',
  imports: [MatSidenavModule, MatButtonModule, MatIconModule],
  templateUrl: './characters-detail.component.html',
  styleUrl: './characters-detail.component.css',
})
export class CharactersDetailComponent {
  @Input() character: Character | null = null;
  @Output() close = new EventEmitter<void>();

  private locationsService = inject(LocationsService);

  onClose(): void {
    this.close.emit();
  }

  getLocationResidents(url: string): Observable<Character[]> {
    return this.locationsService.getResidentsFromLocationUrl(url);
  }
}
