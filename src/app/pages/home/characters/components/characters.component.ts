import { Component, inject, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Character } from '../models/character.interface';
import { Observable } from 'rxjs';
import { loadCharacters } from '../store/characters.actions';
import { CharactersState } from '../store/characters.state';
import {
  selectCharacters,
  selectCharactersError,
  selectCharactersLoading,
  selectCharactersInfo,
} from '../store/characters.selectors';
import { CommonModule } from '@angular/common';
import { ResponseInfo } from '../models';

@Component({
  selector: 'app-characters',
  imports: [CommonModule],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.css',
})
export class CharactersComponent implements OnInit {
  characters$: Observable<Character[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  info$: Observable<ResponseInfo>;

  private store = inject(Store<CharactersState>);

  constructor() {
    this.characters$ = this.store.select(selectCharacters);
    this.loading$ = this.store.select(selectCharactersLoading);
    this.error$ = this.store.select(selectCharactersError);
    this.info$ = this.store.select(selectCharactersInfo);
  }

  ngOnInit(): void {
    this.store.dispatch(loadCharacters());

    this.characters$.subscribe((characters) => {
      console.log('Characters:', characters);
    });

    this.loading$.subscribe((loading) => {
      console.log('Loading:', loading);
    });

    this.error$.subscribe((error) => {
      console.log('Error:', error);
    });
  }
}
