import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadSpecies } from '../../core/species/store/species.actions';
import { selectSpeciesCount } from '../../core/species/store/species.selectors';
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

  ngOnInit() {
    this.store.dispatch(loadSpecies());
  }
}
