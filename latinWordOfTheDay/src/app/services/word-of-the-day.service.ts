import {inject, Injectable} from '@angular/core';
import {WordOfTheDay} from '../models/word-of-the-day.model';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WordOfTheDayService {

  private http = inject(HttpClient);

  public getWordOfTheDay(): Observable<WordOfTheDay> {
    return this.http.get<WordOfTheDay>(`${environment.apiUrl}/items`);
  }
}
