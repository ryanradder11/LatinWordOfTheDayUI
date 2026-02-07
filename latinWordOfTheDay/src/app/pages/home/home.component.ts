import {Component, inject} from '@angular/core';
import {map, Observable} from "rxjs";
import {ScrollComponent} from "../../components/scroll/scroll.component";
import {AsyncPipe} from "@angular/common";
import {Store} from "@ngrx/store";
import {loadWordOfTheDay, loadWordOfTheDayByFavorite, stopTimer} from "../../store/word-of-the-day.actions";
import {selectWordOfTheDay} from "../../store/word-of-the-day.selectors";
import {WordOfTheDay} from "../../store/word-of-the-day.state";
import {ActivatedRoute, RouterLink} from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [
    ScrollComponent,
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private store = inject(Store);

  private route = inject(ActivatedRoute);

  public wordOfTheDay$: Observable<WordOfTheDay> = new Observable<WordOfTheDay>();

  public title = 'Verbum Diei';

  constructor() {

    this.store.dispatch(stopTimer());

    this.route.paramMap.subscribe(params => {
      console.log(params.get('id'));
      if(params.has('id')){
        this.store.dispatch(loadWordOfTheDayByFavorite({favoriteId: params.get('id') ?? ''}));
      }else{
        this.store.dispatch(loadWordOfTheDay());
      }
      this.wordOfTheDay$ = this.store.select(selectWordOfTheDay).pipe(map((wordOfTheDay: WordOfTheDay[]) => wordOfTheDay[0]));
    });
  }
}
