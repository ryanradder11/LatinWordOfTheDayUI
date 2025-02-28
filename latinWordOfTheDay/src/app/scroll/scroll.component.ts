import {Component, Input} from '@angular/core';
import {WordOfTheDay} from "../models/word-of-the-day.model";
import {CapitalizePipe} from "../pipes/capitalize.pipe";

@Component({
    selector: 'app-scroll',
    imports: [CapitalizePipe],
    templateUrl: './scroll.component.html',
    styleUrl: './scroll.component.scss'
})
export class ScrollComponent {

  @Input({ required: true }) wordOfTheDay!: WordOfTheDay;

}
