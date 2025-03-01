import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {ROUTES_NAMES} from "./app-routing.module";

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  items: MenuItem[] | undefined;

  public toggleDarkMode() {
    const element = document.querySelector('html');
    element?.classList.toggle('my-app-dark');
  }

  public ngOnInit() {
    this.items = [
      {
        label: 'Verbum Diei',
        icon: 'pi pi-home',
        routerLink: `/${ROUTES_NAMES.HOME}`
      },
      {
        label: 'Favoriti',
        icon: 'pi pi-star',
        routerLink: `/${ROUTES_NAMES.FAVORITES}`,
      },
      {
        label: 'Explorare',
        icon: 'pi pi-search',
        items: [
          {
            label: 'De factore',
            icon: 'pi pi-server',
            routerLink:`/${ROUTES_NAMES.ABOUT}`
          },
          {
            label: 'Rur',
            icon: 'pi pi-server',
            routerLink: `/${ROUTES_NAMES.WHY}`
          },
          {
            label: 'Dōnāre',
            icon: 'pi pi-bolt',
            routerLink: `/${ROUTES_NAMES.DONATE}`
          },
        ]
      }
    ]
  }
}
