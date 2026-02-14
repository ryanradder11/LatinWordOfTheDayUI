import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { WordOfTheDay } from '../store/word-of-the-day.state';

@Injectable({ providedIn: 'root' })
export class AdminService {
    private http = inject(HttpClient);

    getAllWords(): Observable<WordOfTheDay[]> {
        return this.http.get<WordOfTheDay[]>(
            `${environment.apiUrl}/items`,
        );
    }

    createWord(
        word: Partial<WordOfTheDay>,
    ): Observable<WordOfTheDay> {
        return this.http.post<WordOfTheDay>(
            `${environment.apiUrl}/items`,
            this.toApiFormat(word),
        );
    }

    updateWord(
        id: string,
        word: Partial<WordOfTheDay>,
    ): Observable<WordOfTheDay[]> {
        return this.http.put<WordOfTheDay[]>(
            `${environment.apiUrl}/items/${id}`,
            this.toApiFormat(word),
        );
    }

    deleteWord(id: string): Observable<void> {
        return this.http.delete<void>(
            `${environment.apiUrl}/items/${id}`,
        );
    }

    // Backend expects camelCase (example0Latin) but DB/GET returns snake_case (example0_latin)
    private toApiFormat(word: Partial<WordOfTheDay>): Record<string, unknown> {
        return {
            word: word.word,
            definition: word.definition,
            pronunciation: word.pronunciation,
            origin: word.origin,
            example0: word.example0,
            example0Latin: word.example0_latin,
            example1: word.example1,
            example1Latin: word.example1_latin,
            example2: word.example2,
            example2Latin: word.example2_latin,
            synonyms: word.synonyms,
            antonyms: word.antonyms,
            image: word.image,
        };
    }
}
