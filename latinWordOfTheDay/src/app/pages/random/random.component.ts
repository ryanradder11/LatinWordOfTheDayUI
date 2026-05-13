import { Component, NgZone, inject, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map, Observable, tap } from 'rxjs';
import { Location, AsyncPipe } from '@angular/common';
import { WordOfTheDay } from '../../store/word-of-the-day.state';
import { loadWordOfTheDayByRandom, loadWordOfTheDayByFavorite, stopTimer } from '../../store/word-of-the-day.actions';
import { selectWordOfTheDay } from '../../store/word-of-the-day.selectors';
import { ScrollComponent } from '../../components/scroll/scroll.component';
import { ActivatedRoute } from '@angular/router';

const TIMER_OPTIONS = [
  { label: '5s',  ms: 5000  },
  { label: '10s', ms: 10000 },
  { label: '30s', ms: 30000 },
  { label: '—',   ms: 0     },
] as const;

@Component({
  selector: 'app-random',
  imports: [AsyncPipe, ScrollComponent],
  templateUrl: './random.component.html',
  styleUrl: './random.component.scss'
})
export class RandomComponent implements OnDestroy {
  private store = inject(Store);
  private ngZone = inject(NgZone);
  private location = inject(Location);
  private route = inject(ActivatedRoute);

  @ViewChild('progressBar') progressBarRef?: ElementRef<HTMLElement>;

  readonly timerOptions = TIMER_OPTIONS;

  public wordOfTheDay$: Observable<WordOfTheDay>;
  public intervalMs = 0;
  public paused = false;

  private rafId: number | null = null;
  private rafStartTime = 0;
  private rafStartProgress = 0;

  constructor() {
    this.store.dispatch(stopTimer());

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
      map((words: WordOfTheDay[]) => words[0]),
      filter(w => !!w),
      tap((word) => {
        this.location.replaceState(`/casuale/${word.id}/${word.word}`);
        this.cancelRaf();
        this.rafStartProgress = 0;
        if (this.progressBarRef?.nativeElement) {
          this.progressBarRef.nativeElement.style.width = '0%';
        }
        if (this.intervalMs > 0 && !this.paused) {
          this.startRaf(0);
        }
      })
    );
  }

  setIntervalMs(ms: number) {
    this.cancelRaf();
    this.intervalMs = ms;
    this.rafStartProgress = 0;
    if (this.progressBarRef?.nativeElement) {
      this.progressBarRef.nativeElement.style.width = '0%';
    }
    if (ms > 0 && !this.paused) {
      this.startRaf(0);
    }
  }

  togglePause() {
    this.paused = !this.paused;
    if (this.paused) {
      this.cancelRaf();
    } else if (this.intervalMs > 0) {
      this.startRaf(this.rafStartProgress);
    }
  }

  shuffle() {
    this.cancelRaf();
    this.rafStartProgress = 0;
    if (this.progressBarRef?.nativeElement) {
      this.progressBarRef.nativeElement.style.width = '0%';
    }
    this.store.dispatch(loadWordOfTheDayByRandom());
  }

  private startRaf(fromProgress: number) {
    this.cancelRaf();
    const startTime = performance.now();
    const remaining = (1 - fromProgress) * this.intervalMs;

    this.ngZone.runOutsideAngular(() => {
      const loop = (now: number) => {
        const elapsed = now - startTime;
        const p = Math.min(1, fromProgress + elapsed / this.intervalMs);
        this.rafStartProgress = p;

        if (this.progressBarRef?.nativeElement) {
          this.progressBarRef.nativeElement.style.width = `${p * 100}%`;
        }

        if (p >= 1) {
          this.ngZone.run(() => {
            this.store.dispatch(loadWordOfTheDayByRandom());
            this.rafStartProgress = 0;
          });
          return;
        }

        this.rafId = requestAnimationFrame(loop);
      };
      this.rafId = requestAnimationFrame(loop);
    });
  }

  private cancelRaf() {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  ngOnDestroy() {
    this.cancelRaf();
  }
}
