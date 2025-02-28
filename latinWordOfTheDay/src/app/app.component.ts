import {Component, inject, OnInit} from '@angular/core';
import {of, Observable} from 'rxjs';
import {WordOfTheDay} from './models/word-of-the-day.model';
import {WordOfTheDayService} from './services/word-of-the-day.service';
import {DOCUMENT} from "@angular/common";

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Latin word of the day';
  private wordOfTheDayService = inject(WordOfTheDayService);
  private _document = inject(DOCUMENT);

  public url = this._document.location.hostname;
  public wordOfTheDay$: Observable<WordOfTheDay> = this.wordOfTheDayService.getWordOfTheDay();

  public ngOnInit() {
    this.wordOfTheDay$ = this.wordOfTheDayService.getWordOfTheDay();
  }
}
