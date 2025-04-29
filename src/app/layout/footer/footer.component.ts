import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadSpecies } from '../../core/species/store/species.actions';
import { selectSpeciesCount } from '../../core/species/store/species.selectors';
import { loadTypes } from '../../core/types/store/types.actions';
import { selectTypes } from '../../core/types/store/types.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  private store = inject(Store);
  speciesCount$ = this.store.select(selectSpeciesCount);
  typesCount$ = this.store.select(selectTypes);

  ngOnInit() {
    this.store.dispatch(loadSpecies());
    this.store.dispatch(loadTypes());
  }
}
