import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';

// const userLocale = navigator.language || 'en-US';
// import localeEn from '@angular/common/locales/en';
// registerLocaleData(localeEn);

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ItemDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [RouterModule],
  providers: [
    // { provide: LOCALE_ID, useValue: userLocale }
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
