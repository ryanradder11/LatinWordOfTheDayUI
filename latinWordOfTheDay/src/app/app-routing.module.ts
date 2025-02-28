import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import { FavoritesComponent } from './pages/favorites/favorites.component';
import {AboutComponent} from "./pages/about/about.component";
import {WhyComponent} from "./pages/why/why.component";
import {DonateComponent} from "./pages/donate/donate.component";

export enum ROUTES_NAMES {HOME= 'home', FAVORITES= 'favorites', ABOUT = 'about', WHY = 'why', DONATE = 'donate'}

 const routes: Routes = [
   {path: '', redirectTo: ROUTES_NAMES.HOME, pathMatch: 'full'},
   { path: ROUTES_NAMES.HOME, component: HomeComponent },
   { path: ROUTES_NAMES.FAVORITES, component: FavoritesComponent },
   { path: ROUTES_NAMES.ABOUT, component: AboutComponent },
   { path: ROUTES_NAMES.WHY, component: WhyComponent },
   { path: ROUTES_NAMES.DONATE, component: DonateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
