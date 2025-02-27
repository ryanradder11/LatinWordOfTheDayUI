import {Component, inject, OnInit} from '@angular/core';
import {of, Observable} from 'rxjs';
import {WordOfTheDay} from './models/word-of-the-day.model';
import {WordOfTheDayService} from './services/word-of-the-day.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'latinWordOfTheDay';
  private wordOfTheDayService = inject(WordOfTheDayService);

  public wordOfTheDay$: Observable<WordOfTheDay | null>=  of(null);

  public ngOnInit() {
    this.wordOfTheDay$ = this.wordOfTheDayService.getWordOfTheDay();
  }
}
