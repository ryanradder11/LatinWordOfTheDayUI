export interface WordOfTheDay {
  id: string;
  word: string;
  definition: string;
  pronunciation: string;
  origin: string;
  example0: string;
  example0_latin: string;
  example1: string;
  example1_latin: string;
  example2: string;
  example2_latin: string;
  synonyms: string[];
  antonyms: string[];
  image: string;
  isFavorite?: boolean;
}

export interface WordOfTheDayFavorite {
  id: string;
  word: string;
}

export interface WordOfTheDayState {
  wordOfTheDay: WordOfTheDay[];
  favorites: WordOfTheDayFavorite[];
  timerActive: boolean;
}

export const initialState: WordOfTheDayState = {
  wordOfTheDay: [],
  favorites: JSON.parse(localStorage.getItem('favoriteWords') || '[]'),
  timerActive: false,
}
