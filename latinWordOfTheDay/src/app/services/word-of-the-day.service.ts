import {inject, Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {WordOfTheDay} from "../store/word-of-the-day.state";

@Injectable({
  providedIn: 'root'
})
export class WordOfTheDayService {

  private http = inject(HttpClient);

  public getWordOfTheDay(id? :string): Observable<WordOfTheDay[]> {
    return this.http.get<WordOfTheDay[]>(`${environment.apiUrl}/items/${id?? ''}`).pipe(map((wordOfTheDayLoaded: WordOfTheDay[]) => {
      wordOfTheDayLoaded[0].isFavorite = false;
      return wordOfTheDayLoaded;
    }));
  }
}
