import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, timer } from 'rxjs';
import { catchError, map, mergeMap, switchMap, takeUntil } from 'rxjs/operators';
import * as WordActions from './word-of-the-day.actions';
import {WordOfTheDayService} from "../services/word-of-the-day.service";

@Injectable()
export class WordOfTheDayEffects {
  constructor(private actions$: Actions, private wordOfTheDayService: WordOfTheDayService) {}

  loadWordTheDayByRandom$ = createEffect(() =>

    this.actions$.pipe(
      ofType(WordActions.loadWordOfTheDayByRandom),
      mergeMap((action) =>
        this.wordOfTheDayService.getWordRandom().pipe(
          map(wordOfTheDay => WordActions.wordOfTheDayLoaded({ wordOfTheDay: wordOfTheDay })),
          catchError(() => of({ type: '[WordOfTheDay] Load Failed' }))
        )
      )
    )
  );

  loadWordTheDayByFavorite$ = createEffect(() =>

    this.actions$.pipe(
      ofType(WordActions.loadWordOfTheDayByFavorite),
      mergeMap((action) =>
        this.wordOfTheDayService.getWordById(action.favoriteId).pipe(
          map(wordOfTheDay => WordActions.wordOfTheDayLoaded({ wordOfTheDay: wordOfTheDay })),
          catchError(() => of({ type: '[WordOfTheDay] Load Failed' }))
        )
      )
    )
  );

  loadWordTheDay$ = createEffect(() =>

    this.actions$.pipe(
      ofType(WordActions.loadWordOfTheDay),
      mergeMap(() =>
        this.wordOfTheDayService.getWordDaily().pipe(
          map(wordOfTheDay => WordActions.wordOfTheDayLoaded({ wordOfTheDay: wordOfTheDay })),
          catchError(() => of({ type: '[WordOfTheDay] Load Failed' }))
        )
      )
    )
  );

  timerEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WordActions.toggleTimer),
      switchMap(() =>
        timer(0, 5000).pipe(
          mergeMap(() => this.wordOfTheDayService.getWordRandom()),
          map(wordOfTheDay => WordActions.addWordOfTheDay({ wordOfTheDay: wordOfTheDay })),
          takeUntil(this.actions$.pipe(ofType(WordActions.toggleTimer)))
        )
      )
    )
  );
}
