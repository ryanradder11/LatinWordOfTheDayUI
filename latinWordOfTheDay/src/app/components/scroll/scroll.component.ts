import {Component, inject, Input} from '@angular/core';
import {CapitalizePipe} from "../../pipes/capitalize.pipe";
import {Store} from "@ngrx/store";
import {toggleFavorite} from "../../store/word-of-the-day.actions";
import {WordOfTheDay} from "../../store/word-of-the-day.state";

@Component({
    selector: 'app-scroll',
    imports: [CapitalizePipe],
    templateUrl: './scroll.component.html',
    styleUrl: './scroll.component.scss'
})
export class ScrollComponent {

  private store = inject(Store);

  @Input({ required: true }) wordOfTheDay!: WordOfTheDay;

  public toggleFavorite() {
    this.store.dispatch(toggleFavorite({ id: this.wordOfTheDay.id }));
  }
}
