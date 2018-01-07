import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { RouteReuseStrategy } from '@angular/router';

import { AppComponent }  from './app.component';
import { WelcomeComponent }  from './home/welcome.component';
import { TickerComponent }  from './kraken/ticker.component';

import { CustomReuseStrategy } from './reuse.strategy';

import { ProductModule } from './products/product.module';
import { MovieModule } from './movies/movie.module';
import { KrakenModule } from './kraken/kraken.module';

@NgModule({
  imports: [ 
    BrowserModule,
    HttpModule,
    RouterModule.forRoot([
        { path: 'welcome', component: WelcomeComponent },
        { path: '', redirectTo: 'welcome', pathMatch: 'full' },
        { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
      ]),
      ProductModule,
      MovieModule,
      KrakenModule
    ],
  declarations: [
    AppComponent,
    WelcomeComponent,
    TickerComponent
  ],
  providers: [
        {provide: RouteReuseStrategy, useClass: CustomReuseStrategy}
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
