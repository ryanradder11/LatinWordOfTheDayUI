import { Component, inject } from '@angular/core';
import { WordOfTheDayFavorite } from '../../store/word-of-the-day.state';
import { selectFavorites } from '../../store/word-of-the-day.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ROUTES_NAMES } from '../../app-routing.module';

@Component({
  selector: 'app-favorites',
  imports: [AsyncPipe],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {
  private store = inject(Store);
  private router = inject(Router);

  public favorites$: Observable<WordOfTheDayFavorite[]> = this.store.select(selectFavorites);

  navigateToWord(favorite: WordOfTheDayFavorite) {
    this.router.navigate([`/${ROUTES_NAMES.RANDOM}`, favorite.id, favorite.word]);
  }
}
