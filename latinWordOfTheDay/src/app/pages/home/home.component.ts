import {Component, inject} from '@angular/core';
import {map, Observable} from "rxjs";
import {WordOfTheDay} from "../../models/word-of-the-day.model";
import {WordOfTheDayService} from "../../services/word-of-the-day.service";
import {ScrollComponent} from "../../components/scroll/scroll.component";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-home',
  imports: [
    ScrollComponent,
    AsyncPipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private wordOfTheDayService = inject(WordOfTheDayService);

  public wordOfTheDay$: Observable<WordOfTheDay> = this.wordOfTheDayService.getWordOfTheDay().pipe(
    map((wordOfTheDay: WordOfTheDay[]) => {
      return wordOfTheDay[0];
    })
  );

  public title = 'Verbum Diei';
}
