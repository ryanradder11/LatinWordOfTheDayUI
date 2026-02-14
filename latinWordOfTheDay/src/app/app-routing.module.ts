import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import { FavoritesComponent } from './pages/favorites/favorites.component';
import {AboutComponent} from "./pages/about/about.component";
import {WhyComponent} from "./pages/why/why.component";
import {DonateComponent} from "./pages/donate/donate.component";
import {RandomComponent} from "./pages/random/random.component";
import {LoginComponent} from "./pages/login/login.component";
import {AdminComponent} from "./pages/admin/admin.component";
import {authGuard} from "./guards/auth.guard";

export enum ROUTES_NAMES {
  HOME = 'domus',
  RANDOM = 'casuale',
  FAVORITES = 'favorita',
  ABOUT = 'de',
  WHY = 'cur',
  DONATE = 'donare',
  LOGIN = 'aditus',
  ADMIN = 'praefectus'
}

 const routes: Routes = [
   {path: '', redirectTo: ROUTES_NAMES.HOME, pathMatch: 'full'},
   { path: `${ROUTES_NAMES.HOME}/:id`, component: HomeComponent },
   { path: ROUTES_NAMES.HOME, component: HomeComponent },
   { path: `${ROUTES_NAMES.RANDOM}/:id/:word`, component: RandomComponent },
   { path: `${ROUTES_NAMES.RANDOM}/:id`, component: RandomComponent },
   { path: ROUTES_NAMES.RANDOM, component: RandomComponent },
   { path: ROUTES_NAMES.FAVORITES, component: FavoritesComponent },
   { path: ROUTES_NAMES.ABOUT, component: AboutComponent },
   { path: ROUTES_NAMES.WHY, component: WhyComponent },
   { path: ROUTES_NAMES.DONATE, component: DonateComponent },
   { path: ROUTES_NAMES.LOGIN, component: LoginComponent },
   { path: ROUTES_NAMES.ADMIN, component: AdminComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
