import { Component, HostListener } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  exploreOpen = false;

  toggleExplore(event: MouseEvent) {
    event.stopPropagation();
    this.exploreOpen = !this.exploreOpen;
  }

  closeExplore() {
    this.exploreOpen = false;
  }

  @HostListener('document:click')
  onDocumentClick() {
    this.exploreOpen = false;
  }
}
