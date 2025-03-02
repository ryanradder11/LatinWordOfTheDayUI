import { createAction, props } from '@ngrx/store';
import {WordOfTheDay} from './word-of-the-day.state';

export const loadWordOfTheDay = createAction('[WordOfTheDay] Load WordOfTheDay');
export const wordOfTheDayLoaded = createAction('[WordOfTheDay] WordOfTheDay Loaded', props<{ wordOfTheDay: WordOfTheDay[] }>());
export const addWordOfTheDay = createAction('[WordOfTheDay] Add WordOfTheDayJoke', props<{ wordOfTheDay: WordOfTheDay[] }>());
export const toggleTimer = createAction('[WordOfTheDay] Toggle Timer');
export const toggleFavorite = createAction('[WordOfTheDay] Toggle Favorite', props<{ id: string }>());
export const removeFavorite = createAction('[WordOfTheDay] Remove Favorite', props<{ id: string }>());
export const loadWordOfTheDayByFavorite = createAction('[WordOfTheDay] Load WordOfTheDay By Favorite', props<{ favoriteId: string }>());

export const loadWordOfTheDayByRandom = createAction('[WordOfTheDay] Load WordOfTheDay By random');
