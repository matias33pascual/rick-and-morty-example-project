import { Component, Input, Output, EventEmitter, inject, SimpleChanges } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Character } from '../../../core/characters/models/character.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { map, Observable, of } from 'rxjs';
import { CharactersService } from '../../../core/characters/services/characters.service';
import { LocationsService } from '../../../core/locations/services/locations.service';
import { EpisodesService } from '../../../core/episodes/services/episodes.service';
import { CommonModule } from '@angular/common';
import { EpisodeResponse } from '../../../core/episodes/interfaces/episode-response.interface';

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
  private episodesService = inject(EpisodesService);

  resident$!: Observable<string>;
  episodeCharacter$!: Observable<string>;
  episodeInfo$!: Observable<EpisodeResponse>;

  onClose(): void {
    this.close.emit();
  }

  ngOnInit(): void {
    if (this.character?.location.url) {
      this.getLocationResident(this.character?.location.url);
    }
    if (this.character?.episode[0]) {
      this.getEpisodeCharacter(this.character?.episode[0]);
      this.getEpisodeInfo(this.character?.episode[0]);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['character'] && this.character?.location.url) {
      this.getLocationResident(this.character?.location.url);
    }
    if (changes['character'] && this.character?.episode[0]) {
      this.getEpisodeCharacter(this.character?.episode[0]);
      this.getEpisodeInfo(this.character?.episode[0]);
    }
  }

  getLocationResident(url: string): void {
    this.resident$ = this.locationsService.getResidentsFromLocationUrl(url);
  }

  getEpisodeCharacter(url: string): void {
    this.episodeCharacter$ = this.episodesService.getCharactersFromEpisodeUrl(url);
  }

  getEpisodeInfo(url: string): void {
    this.episodeInfo$ = this.episodesService.getEpisodeInfo(url);
  }
}
