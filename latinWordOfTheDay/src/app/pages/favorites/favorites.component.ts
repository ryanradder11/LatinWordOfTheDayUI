import {Component, inject} from '@angular/core';
import {WordOfTheDayFavorite} from "../../store/word-of-the-day.state";
import {selectFavorites} from "../../store/word-of-the-day.selectors";
import {Store} from "@ngrx/store";
import { Observable } from 'rxjs';
import {AsyncPipe} from "@angular/common";
import {CapitalizePipe} from "../../pipes/capitalize.pipe";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-favorites',
  imports: [
    AsyncPipe,
    CapitalizePipe,
    RouterLink,
  ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {

  private store = inject(Store);

  public favorites$: Observable<WordOfTheDayFavorite[]> = this.store.select(selectFavorites);

  public title = 'Favoriti';

}
