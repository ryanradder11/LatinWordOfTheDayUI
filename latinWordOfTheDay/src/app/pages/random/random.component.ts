import {Component, inject} from '@angular/core';
import {Store} from "@ngrx/store";
import {map, Observable} from "rxjs";
import {WordOfTheDay} from "../../store/word-of-the-day.state";
import {
  loadWordOfTheDayByRandom, toggleTimer
} from "../../store/word-of-the-day.actions";
import {selectTimerActive, selectWordOfTheDay} from "../../store/word-of-the-day.selectors";
import {AsyncPipe} from "@angular/common";
import {ScrollComponent} from "../../components/scroll/scroll.component";

@Component({
  selector: 'app-random',
  imports: [
    AsyncPipe,
    ScrollComponent
  ],
  templateUrl: './random.component.html',
  styleUrl: './random.component.scss'
})
export class RandomComponent {
  private store = inject(Store);

  public timerActive$: Observable<boolean> = this.store.select(selectTimerActive);

  public wordOfTheDay$: Observable<WordOfTheDay> = new Observable<WordOfTheDay>();

  public title = 'Verbum Casuale';

  constructor() {
    this.store.dispatch(loadWordOfTheDayByRandom());
    this.wordOfTheDay$ = this.store.select(selectWordOfTheDay).pipe(map((wordOfTheDay: WordOfTheDay[]) => wordOfTheDay[0]));
  }

  public toggleTimer() {
    this.store.dispatch(toggleTimer());
  }
}
