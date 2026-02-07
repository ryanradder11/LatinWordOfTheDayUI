import { Component, NgZone, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map, Observable, tap } from 'rxjs';
import { Location } from '@angular/common';
import { WordOfTheDay } from '../../store/word-of-the-day.state';
import { loadWordOfTheDayByRandom, loadWordOfTheDayByFavorite, stopTimer, toggleTimer } from '../../store/word-of-the-day.actions';
import { selectTimerActive, selectWordOfTheDay } from '../../store/word-of-the-day.selectors';
import { AsyncPipe } from '@angular/common';
import { ScrollComponent } from '../../components/scroll/scroll.component';
import { ActivatedRoute } from '@angular/router';

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
  private location = inject(Location);
  private route = inject(ActivatedRoute);

  public timerActive$: Observable<boolean> = this.store.select(selectTimerActive);
  public wordOfTheDay$: Observable<WordOfTheDay> = new Observable<WordOfTheDay>();
  public title = 'Verbum Casuale';
  public chosenTime = 0;
  public time = 999999;
  private intervalId: any;

  constructor() {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.store.dispatch(loadWordOfTheDayByFavorite({
          favoriteId: params.get('id') ?? '',
          word: params.get('word') ?? undefined
        }));
      } else {
        this.store.dispatch(loadWordOfTheDayByRandom());
      }
    });

    this.wordOfTheDay$ = this.store.select(selectWordOfTheDay).pipe(
      map((wordOfTheDay: WordOfTheDay[]) => wordOfTheDay[0]),
      filter(w => !!w),
      tap((word) => {
        this.location.replaceState(`/casuale/${word.id}/${word.word}`);
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

  public loadRandom() {
    this.store.dispatch(loadWordOfTheDayByRandom());
  }

  private stopCountdown() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
