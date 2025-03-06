import { Component, NgZone, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {map, Observable, tap} from 'rxjs';
import { WordOfTheDay } from '../../store/word-of-the-day.state';
import { loadWordOfTheDayByRandom, stopTimer, toggleTimer } from '../../store/word-of-the-day.actions';
import { selectTimerActive, selectWordOfTheDay } from '../../store/word-of-the-day.selectors';
import { AsyncPipe } from '@angular/common';
import { ScrollComponent } from '../../components/scroll/scroll.component';

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
  private ngZone = inject(NgZone);

  public timerActive$: Observable<boolean> = this.store.select(selectTimerActive);
  public wordOfTheDay$: Observable<WordOfTheDay> = new Observable<WordOfTheDay>();
  public title = 'Verbum Casuale';
  public chosenTime = 0;
  public time = 999999;
  private intervalId: any;

  constructor() {
    this.store.dispatch(loadWordOfTheDayByRandom());
    this.wordOfTheDay$ = this.store.select(selectWordOfTheDay).pipe(
      map((wordOfTheDay: WordOfTheDay[]) => wordOfTheDay[0]),
      tap(() => {
        this.stopCountdown();
        this.startCountdown();
      }));
  }

  public toggleTimer(time: number) {
    this.chosenTime = time;
    this.store.dispatch(toggleTimer({ time: time }));
    this.startCountdown();
  }

  public stopTimer() {
    this.store.dispatch(stopTimer());
    this.stopCountdown();
  }

  private startCountdown() {
    this.time = this.chosenTime;
    this.ngZone.runOutsideAngular(() => {
      this.intervalId = setInterval(() => {
        if (this.time > 0) {
          this.time -= 100;
          this.ngZone.run(() => {}); // Trigger change detection manually if needed
        } else {
          this.stopCountdown();
        }
      }, 100);
    });
  }

  private stopCountdown() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
