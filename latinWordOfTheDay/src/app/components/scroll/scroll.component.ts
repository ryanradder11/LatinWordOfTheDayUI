import {Component, inject, Input, HostListener} from '@angular/core';
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

  public speak() {
    const utterance = new SpeechSynthesisUtterance(this.wordOfTheDay.word);
    utterance.lang = 'la';

    const voices = speechSynthesis.getVoices();
    const italianVoice = voices.find(v => v.lang.startsWith('it'));
    if (italianVoice) {
      utterance.voice = italianVoice;
    }

    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 's' || event.key === 'S') {
      this.speak();
    }
    if(event.key === 'f' || event.key === 'F') {
      this.toggleFavorite();
    }
  }
}
