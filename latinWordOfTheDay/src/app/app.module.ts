import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CommonModule} from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';
import {Menubar} from "primeng/menubar";
import {providePrimeNG} from "primeng/config";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import Material from '@primeng/themes/material';
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {wordOfTheDayReducer} from "./store/word-of-the-day.reducer";
import {WordOfTheDayEffects} from "./store/word-of-the-day.effects";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    Menubar,
    StoreModule.forRoot({wordOfTheDay: wordOfTheDayReducer}), // Provide mock store
    EffectsModule.forRoot([WordOfTheDayEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: true }),
  ],
  providers: [provideHttpClient(withInterceptors([authInterceptor])),  provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Material,
        options: {
          darkModeSelector: '.my-app-dark'
        }
      }
    })],
  bootstrap: [AppComponent]
})
export class AppModule { }
