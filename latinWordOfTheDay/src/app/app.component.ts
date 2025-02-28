import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Verbum Diei';

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
        routerLink: '/home'
      },
      {
        label: 'Favoriti',
        icon: 'pi pi-star',
        route: '/favorites',
      },
      {
        label: 'Contact',
        icon: 'pi pi-search',
        items: [
          {
            label: 'About',
            icon: 'pi pi-server',
            routerLink: '/favorites'
          },
          {
            label: 'Why',
            icon: 'pi pi-server',
            routerLink: '/favorites'
          },
          {
            label: 'dōnāre',
            icon: 'pi pi-bolt',
            routerLink: '/favorites'
          },

        ]
      }
    ]
  }
}
