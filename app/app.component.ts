import { Component } from '@angular/core';
import { ProductService } from './products/product.service';
import { MovieService } from './movies/movie.service';
import { KrakenService } from './kraken/kraken.service';
import { KrakenComponent } from './kraken/kraken.component';

@Component({
    selector: 'pm-app',
    templateUrl: 'app/app.component.html',
    providers: [MovieService, ProductService, KrakenService, KrakenComponent],
})
export class AppComponent {
    pageTitle: string = 'Sugrue Solutions';
}
