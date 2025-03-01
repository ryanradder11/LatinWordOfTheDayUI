import { createFeatureSelector, createSelector } from '@ngrx/store';
import {WordOfTheDayState} from "./word-of-the-day.state";

const selectWordOfTheDayState = createFeatureSelector<WordOfTheDayState>('wordOfTheDay');

export const selectWordOfTheDay = createSelector(selectWordOfTheDayState, state => state.wordOfTheDay);
export const selectFavorites = createSelector(selectWordOfTheDayState, state => state.favorites);
export const selectTimerActive = createSelector(selectWordOfTheDayState, state => state.timerActive);


