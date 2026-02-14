import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {ROUTES_NAMES} from "./app-routing.module";

interface TranslatableMenuItem extends MenuItem {
  englishLabel?: string;
  items?: TranslatableMenuItem[];
}

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  items: TranslatableMenuItem[] | undefined;

  public toggleDarkMode() {
    const element = document.querySelector('html');
    element?.classList.toggle('my-app-dark');
  }

  public ngOnInit() {
    this.items = [
      {
        label: 'Verbum Diei',
        englishLabel: 'Word of the Day',
        icon: 'pi pi-home',
        routerLink: `/${ROUTES_NAMES.HOME}`
      },
      {
        label: 'Verbum Casuale',
        englishLabel: 'Random Word',
        icon: 'pi pi-question',
        routerLink: `/${ROUTES_NAMES.RANDOM}`
      },
      {
        label: 'Favoriti',
        englishLabel: 'Favorites',
        icon: 'pi pi-star',
        routerLink: `/${ROUTES_NAMES.FAVORITES}`,
      },
      {
        label: 'Explorare',
        englishLabel: 'Explore',
        icon: 'pi pi-search',
        items: [
          {
            label: 'De factore',
            englishLabel: 'About',
            icon: 'pi pi-server',
            routerLink:`/${ROUTES_NAMES.ABOUT}`
          },
          {
            label: 'Rur',
            englishLabel: 'Why',
            icon: 'pi pi-server',
            routerLink: `/${ROUTES_NAMES.WHY}`
          },
          {
            label: 'Dōnāre',
            englishLabel: 'Donate',
            icon: 'pi pi-bolt',
            routerLink: `/${ROUTES_NAMES.DONATE}`
          },
          {
            label: 'Aditus',
            englishLabel: 'Admin',
            icon: 'pi pi-lock',
            routerLink: `/${ROUTES_NAMES.LOGIN}`
          },
        ]
      }
    ]
  }
}
