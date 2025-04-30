import { Component, Input, Output, EventEmitter, inject, SimpleChanges } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Character } from '../../../core/characters/models/character.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { map, Observable, of } from 'rxjs';
import { CharactersService } from '../../../core/characters/services/characters.service';
import { LocationsService } from '../../../core/locations/services/locations.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-characters-detail',
  imports: [MatSidenavModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './characters-detail.component.html',
  styleUrl: './characters-detail.component.css',
})
export class CharactersDetailComponent {
  @Input() character: Character | null = null;
  @Output() close = new EventEmitter<void>();

  private locationsService = inject(LocationsService);

  resident$!: Observable<string>;

  onClose(): void {
    this.close.emit();
  }

  ngOnInit(): void {
    if (this.character?.location.url) {
      this.getLocationResident(this.character?.location.url);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['character'] && this.character?.location.url) {
      this.getLocationResident(this.character?.location.url);
    }
  }

  getLocationResident(url: string): void {
    this.resident$ = this.locationsService.getResidentsFromLocationUrl(url).pipe(map((residents) => residents));
  }
}
