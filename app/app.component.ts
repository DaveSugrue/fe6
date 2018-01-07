import { Component } from '@angular/core';
import { ProductService } from './products/product.service';
import { MovieService } from './movies/movie.service';
import { KrakenService } from './kraken/kraken.service';

@Component({
    selector: 'pm-app',
    template: `
        <div>
            <nav class='navbar navbar-default'>
                <div class='container-fluid'>
                    <a class='navbar-brand'>{{pageTitle}}</a>
                    <ul class='nav navbar-nav'>
                        <li><a [routerLink]="['/welcome']"><span class="glyphicon glyphicon-home"></span> Home</a></li>
                        <li><a [routerLink]="['/products']">Product List</a></li>
                        <li><a [routerLink]="['/movies']">Movie List</a></li>
                        <li><a [routerLink]="['/kraken']">Kraken</a></li>
                        <li><a [routerLink]="['/moviesserviced']">Serviced Movie List</a></li>
                    </ul>
                </div>
            </nav>
            <div class='container'>
                <router-outlet></router-outlet>
            </div>
        </div>
    `,
    providers: [MovieService, ProductService, KrakenService]
})
export class AppComponent {
    pageTitle: string = 'Sugrue Solutions';
}
