import { Component } from '@angular/core';
import { CharactersService } from './characters/services/characters.service';
import { CharactersComponent } from './characters/components/characters.component';

@Component({
  selector: 'app-home',
  imports: [CharactersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
