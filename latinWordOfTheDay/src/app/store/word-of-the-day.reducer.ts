import { createReducer, on } from '@ngrx/store';
import * as JokeActions from './word-of-the-day.actions';
import {initialState} from './word-of-the-day.state';

export const wordOfTheDayReducer = createReducer(
  initialState,
  on(JokeActions.wordOfTheDayLoaded, (state, { wordOfTheDay }) => {
    const updatedWordOfTheDay = wordOfTheDay.map(word => ({
      ...word,
      isFavorite: state.favorites.some(fav => fav.id === word.id)
    }));
    return { ...state, wordOfTheDay: updatedWordOfTheDay };
  }),
  on(JokeActions.addWordOfTheDay, (state, { wordOfTheDay }) => {
    const updatedWorkOfTheDay = [wordOfTheDay[0], ...state.wordOfTheDay].slice(0, 10);
    return { ...state, wordOfTheDay: updatedWorkOfTheDay };
  }),

  on(JokeActions.toggleTimer, (state) => ({ ...state, timerActive: !state.timerActive })),

  on(JokeActions.stopTimer, (state) => ({ ...state, timerActive: false })),

  on(JokeActions.toggleFavorite, (state, { id }) => {
    debugger;
    console.log('toggleFavorite: ' + id);
    const wordOfTheDayToToggle = state.wordOfTheDay.find(wordOfTheDay => wordOfTheDay.id === id);
    if (!wordOfTheDayToToggle) return state;

    const isFavorite = !wordOfTheDayToToggle.isFavorite;
    const updatedWordOfTheDay = state.wordOfTheDay.map(word =>
      word.id === id ? { ...word, isFavorite } : word
    );

    const favorites = isFavorite
      ? [...state.favorites, { id: wordOfTheDayToToggle.id, word: wordOfTheDayToToggle.word }]
      : state.favorites.filter(fav => fav.id !== id);

    localStorage.setItem('favoriteWords', JSON.stringify(favorites));
    return { ...state, wordOfTheDay: updatedWordOfTheDay, favorites };
  }),

  on(JokeActions.removeFavorite, (state, { id }) => {
    const updatedFavorites = state.favorites.filter(j => j.id !== id);
    localStorage.setItem('favoriteWords', JSON.stringify(updatedFavorites));
    return { ...state, favorites: updatedFavorites };
  })
);
