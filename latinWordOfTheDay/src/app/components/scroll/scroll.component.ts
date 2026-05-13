import { Component, inject, Input, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { toggleFavorite } from '../../store/word-of-the-day.actions';
import { WordOfTheDay } from '../../store/word-of-the-day.state';

@Component({
  selector: 'app-scroll',
  imports: [],
  templateUrl: './scroll.component.html',
  styleUrl: './scroll.component.scss'
})
export class ScrollComponent {
  private store = inject(Store);

  @Input({ required: true }) wordOfTheDay!: WordOfTheDay;

  playing = false;
  private playTimeout: ReturnType<typeof setTimeout> | null = null;

  readonly ROMAN = ['i', 'ii', 'iii', 'iv', 'v'];

  get examples() {
    return [
      { la: this.wordOfTheDay.example0_latin, en: this.wordOfTheDay.example0 },
      { la: this.wordOfTheDay.example1_latin, en: this.wordOfTheDay.example1 },
      { la: this.wordOfTheDay.example2_latin, en: this.wordOfTheDay.example2 },
    ].filter(ex => ex.la || ex.en);
  }

  toggleFavorite() {
    this.store.dispatch(toggleFavorite({ id: this.wordOfTheDay.id }));
  }

  speak() {
    this.playing = true;
    if (this.playTimeout) clearTimeout(this.playTimeout);
    this.playTimeout = setTimeout(() => { this.playing = false; }, 1400);

    const utterance = new SpeechSynthesisUtterance(this.wordOfTheDay.word);
    utterance.lang = 'la';
    const voices = speechSynthesis.getVoices();
    const italianVoice = voices.find(v => v.lang.startsWith('it'));
    if (italianVoice) utterance.voice = italianVoice;
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 's' || event.key === 'S') this.speak();
    if (event.key === 'f' || event.key === 'F') this.toggleFavorite();
  }
}
